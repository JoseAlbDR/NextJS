import { PrismaAdapter } from '@auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import NextAuth from 'next-auth';
import GitHub from 'next-auth/providers/github';
import Google from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';
import { signInEmailPassword } from '@/auth/actions/auth-actions';

const prisma = new PrismaClient();

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GitHub,
    Google,

    Credentials({
      credentials: {
        email: {
          label: 'Correo electrónico',
          type: 'email',
          placeholder: 'usuario@google.com',
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: '******',
        },
      },
      async authorize({ email, password }) {
        console.log({ email, password });
        const user = await signInEmailPassword(
          email as string,
          password as string
        );
        console.log({ user });
        if (user) return user;
        return null;
      },
    }),
  ],

  session: {
    strategy: 'jwt',
  },

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    // async redirect({ url, baseUrl }) {
    //   console.log({ url, baseUrl });
    //   // Allows relative callback URLs
    //   if (url.startsWith('/')) return `${baseUrl}${url}`;
    //   // Allows callback URLs on the same origin
    //   else if (new URL(url).origin === baseUrl) return url;
    //   return baseUrl;
    // },

    async jwt({ token, user, account, profile }) {
      const dbUser = await prisma.user.findUnique({
        where: {
          email: token.email!,
        },
      });

      if (dbUser?.isActive === false) throw Error('Usuario inactivo');

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
