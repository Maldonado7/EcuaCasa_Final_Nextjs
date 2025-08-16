// Temporarily disabled Clerk middleware
// import { clerkMiddleware } from "@clerk/nextjs/server";

// export default clerkMiddleware();

export default function middleware() {
  // Middleware temporarily disabled
}

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
