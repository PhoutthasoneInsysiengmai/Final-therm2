import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectMongoDB } from "../../../../../lib/mongodb";
import User from "../../../../../models/user";
import bcrypt from "bcryptjs";

const authOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        const { email, password } = credentials;

        try {
          await connectMongoDB(); // ເຊື່ອມຕໍ່ MongoDB
          const user = await User.findOne({ email }); // ຄົ້ນຫາຜູ້ໃຊ້ຈາກອີເມວ

          if (!user) {
            return null; // ບໍ່ພົບຜູ້ໃຊ້
          }

          // ກວດສອບລະຫັດຜ່ານ
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (!passwordMatch) {
            return null; // ລະຫັດຜ່ານບໍ່ຕົງ
          }

          // สສົ່ງກັບຂໍ້ມູນຜູ້ໃຊ້ທີ່ຈຳເປັນ
          return { id: user._id, name: user.name, email: user.email };
        } catch (error) {
          console.log("Error", error);
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      // ເພີ່ມ ID ຜູ້ໃຊ້ໃນ session
      session.user.id = token.sub;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id; // ເພີ່ມ ID ຜູ້ໃຊ້ໃນ token
      }
      return token;
    },
  },
  session: {
    strategy: "jwt", // ໃຊ້ JWT ສຳຫລັບ session ຫຍໍ້ມາຈາກ JSON WEB TOKEN
  },
  secret: process.env.NEXTAUTH_SECRET, // ໃຊ້ secret ຈາກ environment variable
  pages: {
    signIn: "/login", // ກຳນົດຫນ້າ login
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };

// ການຢືນຢັນໄຟລ໌ການຕັ້ງຄ່າດ້ວຍ NextAuth.js

// ໃຊ້ CredentialsProvider ເພື່ອເຂົ້າສູ່ລະບົບດ້ວຍອີເມວ ແລະລະຫັດຜ່ານ

// ລະຫັດຜ່ານຖືກຢືນຢັນດ້ວຍ bcrypt.

// ເພີ່ມຂໍ້ມູນຜູ້ໃຊ້ໃສ່ເຊດຊັນ ແລະໂທເຄັນ

// ປັບແຕ່ງໜ້າເຂົ້າສູ່ລະບົບ ແລະໃຊ້ຍຸດທະສາດ JWT.