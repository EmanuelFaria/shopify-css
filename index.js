export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const assetPath = url.pathname === '/' ? '/theme-custom.css' : url.pathname;

    try {
      const response = await env.ASSETS.fetch(new Request(url.origin + assetPath));
      const modifiedResponse = new Response(response.body, response);
      modifiedResponse.headers.set('Content-Type', 'text/css');
      modifiedResponse.headers.set('Access-Control-Allow-Origin', '*');
      modifiedResponse.headers.set('Cache-Control', 'public, max-age=14400'); // 4-hour cache
      return modifiedResponse;
    } catch (error) {
      return new Response('CSS not found', { 
        status: 404,
        headers: { 'Content-Type': 'text/plain' }
      });
    }
  }
};
