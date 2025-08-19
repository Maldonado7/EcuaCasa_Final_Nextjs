import { createRouteHandler } from "uploadthing/next";

import { ourFileRouter } from "./core";

// Debug environment variables
console.log('UPLOADTHING_TOKEN exists:', !!process.env.UPLOADTHING_TOKEN);
console.log('UPLOADTHING_SECRET exists:', !!process.env.UPLOADTHING_SECRET);
console.log('Available env vars:', Object.keys(process.env).filter(key => key.includes('UPLOAD')));

// Export routes for Next App Router  
export const { GET, POST } = createRouteHandler({
  router: ourFileRouter,
  config: {
    token: process.env.UPLOADTHING_SECRET || process.env.UPLOADTHING_TOKEN,
    isDev: process.env.NODE_ENV === "development",
  },
});