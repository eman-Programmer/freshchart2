import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      name: "My Login",

      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "enter your Email",
        },

        password: {
          label: "Password",
          type: "password",
          placeholder: "enter your password",
        },
      },

      async authorize(credentials) {
        const res = await fetch(`${process.env.API}/auth/signin`, {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
        });

        const result = await res.json();

        if (!res.ok) {
          throw new Error(result.message || "Login failed");
        }

        const userData: { id: string } = jwtDecode(result.token);

        return {
          id: userData.id,
          email: result.user.email,
          name: result.user.name,
          token: result.token,
        };
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.token = user.token;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.token = token.token as string;
      }

      return session;
    },
  },
};