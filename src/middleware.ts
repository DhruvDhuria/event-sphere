import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/",
  "/discover-events",
  "/categories(.*)",
  "event/:eventId"
]);
const isPublicApiRoute = createRouteMatcher([
  "/api/events(.*)",
  "/api/categories(.*)",

])

export default clerkMiddleware(async (auth, request) => {
  if (!isPublicRoute(request) && !isPublicApiRoute(request)) {
    await auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
