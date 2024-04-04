import { NextResponse } from 'next/server';
import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    if (
      request.nextUrl.pathname.startsWith('/admin') &&
      request.nextauth.token?.data?.roles.includes(3)
    ) {
      return NextResponse.rewrite(new URL('/admin/denied', request.url));
    }

    if (
      request.nextauth.token?.data?.roles.includes(2) &&
      request.nextUrl.pathname.startsWith('/admin/users') &&
      request.nextUrl.pathname.startsWith('/admin/roles')
    ) {
      return NextResponse.rewrite(new URL('/admin/denied', request.url));
    }
    return;
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
