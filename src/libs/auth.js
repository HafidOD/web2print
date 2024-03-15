import prisma from "@/libs/prisma";
import { compare } from "bcryptjs";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  pages: {
    signIn: "/en/",
  },
  session: {
    strategy: "jwt",
    maxAg: 60,
  },
  providers: [
    CredentialsProvider({
      name: "Sign in",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Correo",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
          include: {
            property: true,
          },
        });
        // console.log(user);

        if (!user || !(await compare(credentials.password, user.password))) {
          return null;
        }

        return {
          id: user.id,
          property: user.property.propertyName,
          email: user.email,
          name: user.userName,
          role: user.role,
          telefono: user.telefono,
          typePrice: user.typePrice,
          currency: user.currency,
          randomKey: "escapetefate",
        };
      },
    }),
  ],
  callbacks: {
    // console.log(baseUrl);
    // redirect(url, baseUrl) {
    //   return "http://localhost:3000/en/dashboard";
    // },
    session: ({ session, token }) => {
      // console.log(session, token);
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          property: token.property,
          role: token.role,
          telefono: token.telefono,
          typePrice: token.typePrice,
          currency: token.currency,
          randomKey: token.randomKey,
        },
      };
    },
    jwt: ({ token, user }) => {
      // console.log(token, user);

      if (user) {
        // console.log(user);
        // const u = user;
        return {
          ...token,
          id: user.id,
          property: user.property,
          role: user.role,
          telefono: user.telefono,
          typePrice: user.typePrice,
          currency: user.currency,
          randomKey: user.randomKey,
        };
      }
      return token;
    },
  },
};
