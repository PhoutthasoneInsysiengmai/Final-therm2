import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Recipe from "../../../../models/recipe";

// GET: ດຶງຂໍ້ມູນສູດອາຫານທັງຫມົດ
export async function GET() {
  try {
    await connectMongoDB();
    const recipes = await Recipe.find(); // คຄົ້ນຫາສູດອາຫານທັງຫມົດ
    return NextResponse.json({ recipes }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred.", error: error.message },
      { status: 500 }
    );  
  }
}

// POST: ສ້າງສູດອາຫານໃຫມ່
export async function POST(req) {
  try {
    const formData = await req.formData(); // ອ່ານ FormData
    // ອ່ານຂໍ້ມູນຈາກ FormData
    const title = formData.get("title");
    const ingredients = formData.get("ingredients");
    const instructions = formData.get("instructions");
    const userId = formData.get("userId");
    const image = formData.get("image");

    // ກວດສອບວ່າມີຂໍ້ມູນຄົບບໍ່
    if (!title || !ingredients || !instructions || !userId || !image) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    // ແປງຮູບເປັນ base64
    const imageBuffer = await image.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString("base64");
    const dataUrl = `data:${image.type};base64,${base64Image}`;

    // สສ້າງສູດອາຫານໃຫມ່
    await connectMongoDB();
    const newRecipe = await Recipe.create({
      title,
      ingredients,
      instructions,
      userId,
      imageUrl: dataUrl, // ເກັບຮູບພາບເປັນ base64
    });

    return NextResponse.json({ message: "Recipe created.", recipe: newRecipe }, { status: 201 });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "An error occurred.", error: error.message }, { status: 500 });
  }
}

// PUT: ອັບເດດສູດອາຫານ
export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const { title, ingredients, instructions } = await req.json();

    // ກວດສອບວ່າມີຂໍ້ມູນຄົບບໍ່
    if (!title || !ingredients || !instructions) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    await connectMongoDB();
    // ອັບເດດສູດອາຫານ
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      { title, ingredients, instructions },
      { new: true } // ຄືນຄ່າສູດອາຫານທີ່ອັບເດດແລ້ວ
    );

    if (!updatedRecipe) {
      return NextResponse.json({ message: "Recipe not found." }, { status: 404 });
    }

    return NextResponse.json({ message: "Recipe updated.", recipe: updatedRecipe }, { status: 200 });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "An error occurred.", error: error.message }, { status: 500 });
  }
}
// API endpoint ສໍາລັບການຈັດການສູດອາຫານ

// ມັນມີ GET, POST, PUT ສໍາລັບການດຶງຂໍ້ມູນ, ສ້າງແລະປັບປຸງສູດອາຫານ.

// ຮູບພາບຈະຖືກປ່ຽນເປັນ base64 ກ່ອນທີ່ຈະບັນທຶກ.