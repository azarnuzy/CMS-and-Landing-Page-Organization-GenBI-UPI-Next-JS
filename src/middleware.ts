import { NextResponse } from 'next/server';
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    if (
      request.nextUrl.pathname.startsWith('/admin') &&
      request.nextauth.token?.data?.roles.includes(1)
    ) {
      return;
    }

    if (
      // include 2 or 1
      request.nextauth.token?.data?.roles.includes(1 || 2) &&
      request.nextUrl.pathname.startsWith('/admin/users') &&
      request.nextUrl.pathname.startsWith('/admin/roles')
    ) {
      return;
    }
    return NextResponse.rewrite(new URL('/admin/denied', request.url));
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        return !!token;
      },
    },
  }
);

export const config = {
  matcher: ['/admin', '/admin/:path*'],
};
