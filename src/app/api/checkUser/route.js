import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import User from "../../../../models/user";

export async function POST(req) {
  try {
    await connectMongoDB(); // ເຊື່ອມຕໍ່ MongoDB
    const { email } = await req.json(); // ອ່ານອີເມວຈາກ request body
    const user = await User.findOne({ email }).select("_id"); // ຄົ້ນຫາຜູ້ໃຊ້ຈາກອີເມວ (ເລືອກສະເພາະ _id)
    console.log("User ", user);

    return NextResponse.json({ user }); // สສົ່ງກັບຂໍ້ມູນຜູ້ໃຊ້

  } catch (error) {
    console.log(error);
  }
}

// API endpoint ສໍາລັບການກວດສອບວ່າຜູ້ໃຊ້ມີຢູ່ແລ້ວ.

// ຄົ້ນຫາຜູ້ໃຊ້ທາງອີເມວແລະສົ່ງຄືນພຽງແຕ່ _id