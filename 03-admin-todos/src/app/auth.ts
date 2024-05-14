import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [GitHub, Google],

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },

    async jwt({ token, user, account, profile }) {
      const dbUser = await prisma.user.findUnique({
        where: {
          email: token.email!,
        },
      });

      token.roles = dbUser?.roles || ['no-roles'];
      token.id = dbUser?.id || 'no-uuid';

      return token;
    },

    async session({ session, token, user }) {
      if (session && session.user) {
        session.user.roles = token.roles;
        session.user.id = token.id;
      }
      return session;
    },
  },
});
