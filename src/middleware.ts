import { withAuth } from 'next-auth/middleware';

export default withAuth(
  function () {
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
