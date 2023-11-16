import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth(auth, req) {
    // Si esta authentificado y es una ruta publica, establece path en "select-org" para luego hacer la redireccion
    if (auth.userId && auth.isPublicRoute) {
      let path = "select-org";

      // Si tiene un orgId, path se cambia para hacer la redirrecion a la organizacion con su id correspondiente
      if (auth.orgId) {
        path = `/organization/${auth.orgId}`
      }

      const orgSelection = new URL(path, req.url)

      return NextResponse.redirect(orgSelection)
    }

    // Si no esta authentificado y no esta en una ruta publica, redirigmos al user al log in y guardamos la url actual para que despues de iniciar sesion, se rediriga a donde intento ir inicialmente
    if (!auth.userId && !auth.isPublicRoute) {
      return redirectToSignIn({ returnBackUrl: req.url });
    }

    // Si esta authentificado, no tiene un orgId y la url es diferente a "/select-org" lo redirigimos a /select-org para que si o si cree una organization para poder entrar 
    if (auth.userId && !auth.orgId && req.nextUrl.pathname !== "/select-org") {
      const orgSelection = new URL("/select-org", req.url)

      return NextResponse.redirect(orgSelection)
    }
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};