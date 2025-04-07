import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";
import bcrypt from 'bcryptjs'

export async function POST(req) {
    try {
        const { name, email, password } = await req.json(); // ອ່ານຂໍ້ມູນຈາກ request
        const hashedPassword = await bcrypt.hash(password, 10); // ເຂົ້າລະຫັດຜ່ານ

        await connectMongoDB();
        await User.create({ name, email, password: hashedPassword }); // ສ້າງຜູ້ໃຊ້ໃຫມ່

        return NextResponse.json({ message: "User registered." }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ message: "An error occured while registrating the user.", error }, { status: 500 });
    }
}
// API endpoint ສໍາລັບການລົງທະບຽນຜູ້ໃຊ້ໃຫມ່

// ລະຫັດຜ່ານຖືກເຂົ້າລະຫັດດ້ວຍ bcrypt ກ່ອນທີ່ຈະຖືກບັນທຶກໄວ້.