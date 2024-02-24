import { NextAuthOptions } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import CredentialsProvider from 'next-auth/providers/credentials';

import { loginRequest } from '@/hooks/auth/request';

import { TLoginData } from '@/types/auth';

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: '/login',
  },
  session: {
    maxAge: 5 * 60 * 60, // 5 hours
  },
  providers: [
    CredentialsProvider({
      id: 'login',
      type: 'credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
        },
        password: {
          label: 'Password',
          type: 'password',
        },
      },
      async authorize(credentials): Promise<TLoginData> {
        try {
          const data = await loginRequest({
            username: credentials?.username as string,
            password: credentials?.password as string,
          });

          return data;
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
          if (error.response.status === 422) {
            throw new Error(error.response.data.message);
          }

          throw new Error(
            typeof error.response.data === 'string'
              ? error.response.data
              : error.response.data?.message
          );
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      if (user) return true;

      return false;
    },
    async jwt({ token, user, account }) {
      const currentUser = user as TLoginData;

      if (account?.provider === 'login' && currentUser) {
        token.token = currentUser.data.token;
        currentUser.username = currentUser.data.name;
      }

      return { ...token, ...currentUser };
    },
    async session({ session, token }) {
      const tempToken = token as unknown as TLoginData & JWT;

      const jwt_token = {
        token: token?.token as string,
      };
      session = {
        expires: token?.exp as string,
        user: {
          token: jwt_token,
          id: tempToken?.data?.uuid as string,
          username: tempToken?.data.username as string,
        },
      };

      return session;
    },
  },
};
