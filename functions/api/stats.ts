/**
 * GET /api/stats?key=ADMIN_KEY&days=7
 * Returns aggregated tracking stats. Protected by a secret key.
 */
interface Env {
    TRACKING: KVNamespace;
    ADMIN_KEY: string;
}

interface TrackEvent {
    type: string;
    page: string;
    target?: string;
    lang: string;
    country: string;
    referrer: string;
    ua: string;
    screen: string;
    ts: number;
}

export const onRequestGet: PagesFunction<Env> = async (context) => {
    const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
    };

    if (!context.env.TRACKING) {
        return new Response(JSON.stringify({ error: "KV binding 'TRACKING' is missing in Cloudflare settings" }), { status: 500, headers: corsHeaders });
    }

    const url = new URL(context.request.url);
    const key = url.searchParams.get("key");
    const daysParam = parseInt(url.searchParams.get("days") || "7");
    const days = Math.min(Math.max(daysParam, 1), 90);

    const adminKey = context.env.ADMIN_KEY || "luxora-admin-2026";
    if (key !== adminKey) {
        return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: corsHeaders });
    }

    const allEvents: TrackEvent[] = [];
    const now = new Date();
    for (let i = 0; i < days; i++) {
        const d = new Date(now.getTime());
        d.setDate(d.getDate() - i);
        const dayKey = `track:${d.toISOString().slice(0, 10)}`;
        const data = await context.env.TRACKING.get(dayKey, "json") as TrackEvent[] | null;
        if (data) allEvents.push(...data);
    }

    const stats = {
        total: allEvents.length,
        period: `${days} days`,
        byType: {} as Record<string, number>,
        byCountry: {} as Record<string, number>,
        byLang: {} as Record<string, number>,
        byPage: {} as Record<string, number>,
        byReferrer: {} as Record<string, number>,
        byDay: {} as Record<string, number>,
        topClicks: {} as Record<string, number>,
        topCarts: {} as Record<string, number>,
        byDevice: { mobile: 0, desktop: 0 } as Record<string, number>,
        recentEvents: allEvents.slice(-50).reverse(),
    };

    for (const e of allEvents) {
        stats.byType[e.type] = (stats.byType[e.type] || 0) + 1;
        stats.byCountry[e.country] = (stats.byCountry[e.country] || 0) + 1;
        stats.byLang[e.lang] = (stats.byLang[e.lang] || 0) + 1;
        stats.byPage[e.page] = (stats.byPage[e.page] || 0) + 1;
        if (e.referrer) {
            try {
                const ref = new URL(e.referrer).hostname;
                stats.byReferrer[ref] = (stats.byReferrer[ref] || 0) + 1;
            } catch { /* ignore */ }
        }
        const day = new Date(e.ts).toISOString().slice(0, 10);
        stats.byDay[day] = (stats.byDay[day] || 0) + 1;
        if (e.type === "click" && e.target) {
            stats.topClicks[e.target] = (stats.topClicks[e.target] || 0) + 1;
        }
        if (e.type === "cart" && e.target) {
            stats.topCarts[e.target] = (stats.topCarts[e.target] || 0) + 1;
        }
        if (e.screen) {
            const w = parseInt(e.screen.split("x")[0]);
            if (w < 768) stats.byDevice.mobile++;
            else stats.byDevice.desktop++;
        }
    }

    return new Response(JSON.stringify(stats, null, 2), { status: 200, headers: corsHeaders });
};
