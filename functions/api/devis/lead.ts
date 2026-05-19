/**
 * POST /api/devis/lead — Maison Alba (immobilier-luxe)
 * Sauvegarde un lead estimation/demande dans KV TRACKING.
 * Notif Telegram patron si step_reached >= 3 OU completed.
 */

interface Env {
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
  TRACKING?: KVNamespace;
}

interface LeadPayload {
  lead_id?: string;
  metier: string;
  step_reached: number;
  completed?: boolean;
  inputs?: Record<string, unknown>;
  estimation_min?: number;
  estimation_max?: number;
  currency?: string;
  contact_nom?: string;
  contact_tel?: string;
  contact_email?: string;
  contact_message?: string;
  consent?: boolean;
  utm_source?: string;
  lang?: string;
  ville?: string;
}

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function hashIp(ip: string): string {
  let h = 0;
  for (let i = 0; i < ip.length; i++) h = ((h << 5) - h + ip.charCodeAt(i)) | 0;
  return Math.abs(h).toString(36);
}

export const onRequestOptions: PagesFunction<Env> = async () =>
  new Response(null, { status: 204, headers: CORS });

export const onRequestPost: PagesFunction<Env> = async (context) => {
  try {
    const body = await context.request.json<LeadPayload>();

    if (!body.metier || typeof body.step_reached !== "number") {
      return json({ ok: false, error: "metier+step_reached required" }, 400);
    }

    const now = Date.now();
    const lead_id = body.lead_id || `${now}_${Math.random().toString(36).slice(2, 8)}`;
    const ip = context.request.headers.get("CF-Connecting-IP") || "";
    const ua = context.request.headers.get("user-agent") || "";

    const stored: any = {
      lead_id,
      created_at: now,
      updated_at: now,
      metier: body.metier,
      step_reached: body.step_reached,
      completed: !!body.completed,
      inputs: body.inputs || {},
      estimation_min: body.estimation_min ?? null,
      estimation_max: body.estimation_max ?? null,
      currency: body.currency || "EUR",
      contact: {
        nom: body.contact_nom || "",
        tel: body.contact_tel || "",
        email: body.contact_email || "",
        message: body.contact_message || "",
        consent: !!body.consent,
      },
      utm_source: body.utm_source || "",
      lang: body.lang || "fr",
      ville: body.ville || "",
      ip_hash: ip ? hashIp(ip) : "",
      user_agent: ua.slice(0, 200),
    };

    if (context.env.TRACKING) {
      const key = `devis:lead:${lead_id}`;
      const existing = (await context.env.TRACKING.get(key, "json")) as { created_at?: number } | null;
      if (existing && existing.created_at) {
        stored.created_at = existing.created_at;
      }
      await context.env.TRACKING.put(key, JSON.stringify(stored), {
        expirationTtl: 60 * 60 * 24 * 365,
      });

      const ymd = new Date(now).toISOString().slice(0, 7).replace("-", "");
      const idxKey = `devis:index:${ymd}`;
      const idx = ((await context.env.TRACKING.get(idxKey, "json")) as string[] | null) || [];
      if (!idx.includes(lead_id)) {
        idx.unshift(lead_id);
        if (idx.length > 500) idx.length = 500;
        await context.env.TRACKING.put(idxKey, JSON.stringify(idx), {
          expirationTtl: 60 * 60 * 24 * 400,
        });
      }
    }

    const notifyThreshold = stored.completed || stored.step_reached >= 3;
    if (notifyThreshold && context.env.TELEGRAM_BOT_TOKEN && context.env.TELEGRAM_CHAT_ID) {
      const fence = stored.completed ? "Devis complete" : `Lead en cours - step ${stored.step_reached}`;
      const est = stored.estimation_min && stored.estimation_max
        ? `\nEstimation: ${stored.estimation_min}-${stored.estimation_max} ${stored.currency}`
        : "";
      const contact = stored.contact.nom || stored.contact.tel || stored.contact.email
        ? `\nContact: ${stored.contact.nom || "-"} / ${stored.contact.tel || "-"} / ${stored.contact.email || "-"}`
        : "";
      const msg = `[Maison Alba] ${fence}\nMetier: ${stored.metier}${est}${contact}\nVille: ${stored.ville || "?"} (${stored.lang})\nID: ${lead_id}`;
      try {
        await fetch(`https://api.telegram.org/bot${context.env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: context.env.TELEGRAM_CHAT_ID,
            text: msg,
            disable_web_page_preview: true,
          }),
        });
      } catch (_) { /* silent */ }
    }

    return json({ ok: true, lead_id });
  } catch (e: any) {
    return json({ ok: false, error: e?.message || "Internal error" }, 500);
  }
};

function json(payload: unknown, status = 200) {
  return new Response(JSON.stringify(payload), {
    status,
    headers: { ...CORS, "Content-Type": "application/json" },
  });
}
