import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { getAdmins } from "./data-services"; 

const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      try {
        const email = user.email;

        const admins = await getAdmins();

        const isAdmin = admins.some((admin) => admin.email === email);

        if (isAdmin) {
          return true;
        } else {
          return "/"; 
        }
      } catch (error) {
        console.error("Error checking admin list during sign-in:", error);
        return false; 
      }
    },
  },
};

export const { auth, signIn, signOut, handlers: { GET, POST } } = NextAuth(authConfig);
