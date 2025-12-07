// Cloudflare Pages Function Middleware
// This middleware intercepts all requests and sets proper caching headers
// for both Cloudflare edge cache and browser cache

interface Env {
  ASSETS: { fetch: typeof fetch };
}

export const onRequest: PagesFunction<Env> = async (context) => {
  // Get the URL from the request
  const url = new URL(context.request.url);
  
  // Create a new request with cache options
  const cacheKey = new Request(url.toString(), context.request);
  const cache = caches.default;
  
  // Check if the response is already in Cloudflare's cache
  let response = await cache.match(cacheKey);
  
  if (!response) {
    // Not in cache, get the response from the next handler (the static asset)
    response = await context.next();
    
    // Clone the response so we can modify headers
    const newResponse = new Response(response.body, response);
    
    // Get the content type to determine caching strategy
    const contentType = newResponse.headers.get('content-type') || '';
    const isHTML = contentType.includes('text/html');
    
    // Set Cache-Control headers based on content type
    if (isHTML) {
      // HTML files: Cloudflare caches for 1 year, browsers always fetch fresh
      newResponse.headers.set(
        'Cache-Control',
        'public, s-maxage=31536000, max-age=0, must-revalidate'
      );
    } else {
      // Static assets: Both Cloudflare and browsers cache for 1 year
      newResponse.headers.set(
        'Cache-Control',
        'public, s-maxage=31536000, max-age=31536000, immutable'
      );
    }
    
    // Add CDN-Cache-Control for Cloudflare specifically (takes precedence over Cache-Control)
    // This ensures Cloudflare caches everything
    newResponse.headers.set('CDN-Cache-Control', 'public, max-age=31536000');
    
    // Store the response in Cloudflare's cache
    // Only cache successful responses
    if (newResponse.status === 200) {
      context.waitUntil(cache.put(cacheKey, newResponse.clone()));
    }
    
    return newResponse;
  }
  
  // Return cached response
  return response;
};

