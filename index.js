export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    // Serve CSS files with proper headers
    if (url.pathname.endsWith('.css')) {
      const css = await env.ASSETS.fetch(request);
      const response = new Response(css.body, css);
      response.headers.set('Content-Type', 'text/css');
      response.headers.set('Access-Control-Allow-Origin', '*');
      return response;
    }
    return new Response('Not found', { status: 404 });
  }
};
