import Credentials from 'next-auth/providers/credentials'
import type { NextAuthOptions } from 'next-auth'
import { verifyUser } from '@/lib/users'

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        const email = (credentials?.email || '').toString()
        const password = (credentials?.password || '').toString()
        const user = await verifyUser(email, password)
        if (!user) return null
        return { id: user.id, name: user.name, email: user.email }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
}
