import NextAuth, { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { prisma } from './lib';
import bcrypt from 'bcryptjs';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/auth/login',
    newUser: '/auth/new-account',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const privateRoutes = ['/profile'];
      const loginRoute = '/auth/login';

      const isLoggedIn = !!auth?.user;
      const isPrivateRoute = privateRoutes.includes(nextUrl.pathname);
      const isLoginRoute = loginRoute === nextUrl.pathname;

      if (isPrivateRoute) {
        if (isLoggedIn) return true;
        return false; // Redirect unauthenticated users to login page
      } else if (isLoginRoute && isLoggedIn) {
        console.log({ nextUrl });
        const callbackUrl = nextUrl.searchParams.get('callbackUrl') || '/';
        const page = nextUrl.searchParams.get('page') || '';
        const url = page ? `${callbackUrl}?page=${page}` : callbackUrl;
        return Response.redirect(new URL(url, nextUrl));
      }

      return true;
    },
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;
        const { email, password } = parsedCredentials.data;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return null;

        const isPasswordValid = bcrypt.compareSync(
          password,
          user.password ?? ''
        );
        if (!isPasswordValid) return null;

        const { password: _, ...rest } = user;

        return rest;
      },
    }),
  ],
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
