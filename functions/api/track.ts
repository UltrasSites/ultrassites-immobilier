/**
 * POST /api/track — receives tracking events from the client.
 * Stores them in Cloudflare KV (TRACKING namespace).
 * Each day gets its own KV key: track:YYYY-MM-DD with an array of events.
 */
interface Env {
    TRACKING: KVNamespace;
}

interface TrackEvent {
    type: string;       // "pageview" | "click" | "cart" | "checkout"
    page: string;       // current path
    target?: string;    // what was clicked
    lang: string;       // user language
    country: string;    // from geo API
    referrer: string;   // document.referrer
    ua: string;         // user agent (short)
    screen: string;     // screen size
    ts: number;         // timestamp
}

export const onRequestPost: PagesFunction<Env> = async (context) => {
    const corsHeaders = {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    };

    try {
        const body: TrackEvent = await context.request.json();

        if (!body.type || !body.page) {
            return new Response(JSON.stringify({ ok: false }), { status: 400, headers: corsHeaders });
        }

        const event: TrackEvent = {
            type: String(body.type).slice(0, 20),
            page: String(body.page).slice(0, 200),
            target: body.target ? String(body.target).slice(0, 200) : undefined,
            lang: String(body.lang || "unknown").slice(0, 5),
            country: String(body.country || "XX").slice(0, 5),
            referrer: String(body.referrer || "").slice(0, 300),
            ua: String(body.ua || "").slice(0, 100),
            screen: String(body.screen || "").slice(0, 20),
            ts: Date.now(),
        };

        const day = new Date().toISOString().slice(0, 10);
        const key = `track:${day}`;

        const existing = await context.env.TRACKING.get(key, "json") as TrackEvent[] | null;
        const events = existing || [];
        events.push(event);

        if (events.length > 5000) events.splice(0, events.length - 5000);

        await context.env.TRACKING.put(key, JSON.stringify(events), {
            expirationTtl: 60 * 60 * 24 * 90,
        });

        return new Response(JSON.stringify({ ok: true }), { status: 200, headers: corsHeaders });
    } catch {
        return new Response(JSON.stringify({ ok: false }), { status: 500, headers: corsHeaders });
    }
};

export const onRequestOptions: PagesFunction = async () => {
    return new Response(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    });
};
