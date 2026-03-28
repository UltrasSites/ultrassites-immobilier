export async function onRequest(context: { request: Request }): Promise<Response> {
  const req = context.request as Request & { cf?: { country?: string } };
  const country = req.cf?.country ?? req.headers.get('cf-ipcountry') ?? 'FR';
  return new Response(JSON.stringify({ country }), {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Cache-Control': 'public, max-age=86400',
    },
  });
}
