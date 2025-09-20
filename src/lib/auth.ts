import { NextAuthOptions } from 'next-auth'
import Auth0Provider from 'next-auth/providers/auth0'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const authOptions: NextAuthOptions = {
  providers: [
    Auth0Provider({
      clientId: process.env.AUTH0_CLIENT_ID!,
      clientSecret: process.env.AUTH0_CLIENT_SECRET!,
      issuer: process.env.AUTH0_ISSUER_BASE_URL,
    })
  ],
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/signin',
  },
  callbacks: {
    async jwt({ token, user }) {
      return token
    },
    async session({ session, token }) {
      if (session?.user && token.sub) {
        session.user.id = token.sub
      }
      return session
    },
  },
}