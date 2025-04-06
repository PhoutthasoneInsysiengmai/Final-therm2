import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string; // เพิ่ม id ใน type definition
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}