import type { NextRequest } from 'next/server'
interface Auth {
   login: boolean;
   role: string;
}
export async function middleware(request: NextRequest) {
   const token = request.cookies.get('token')?.value

   var auth: Auth = { login: false, role: 'user' };
   if (token) {
      const options = {
         headers: {
            'Authorization': `Bearer ${token}`
         }
      };
      const url = process.env.NEXT_PUBLIC_API_URL + `/api/auth/check-auth`

      const response = await fetch(url, options)
      const json = await response.json()
      // console.log('auth middleware => ', json)
      if (response.status === 200) {
         auth.login = json?.login
         auth.role = json?.payload?.accessPurpose
      }
   }

   if (!auth.login && request.nextUrl.pathname.startsWith('/admin/login')) {
      return
   }

   if (auth.login && auth.role !== "admin" && request.nextUrl.pathname.startsWith('/admin/login')) {
      return
   }

   if (auth.login && auth.role === "admin" && request.nextUrl.pathname.startsWith('/admin/login')) {
      return Response.redirect(new URL('/admin', request.url));
   }

   if (auth.login && auth.role !== "admin" && request.nextUrl.pathname.startsWith('/admin')) {
      return Response.redirect(new URL('/admin/login', request.url));
   }
   if (!auth.login && request.nextUrl.pathname.startsWith('/account')) {
      return Response.redirect(new URL('/', request.url));
   }

   if (!auth.login && request.nextUrl.pathname.startsWith('/admin')) {
      return Response.redirect(new URL('/admin/login', request.url));
   }
}

export const config = {
   matcher: ['/admin/:path*', '/account/:path*']
}