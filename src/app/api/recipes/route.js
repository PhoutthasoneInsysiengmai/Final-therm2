import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../lib/mongodb";
import Recipe from "../../../../models/recipe";

export async function GET() {
  try {
    await connectMongoDB();
    const recipes = await Recipe.find();
    return NextResponse.json({ recipes }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred.", error: error.message },
      { status: 500 }
    );  
  }
}

export async function POST(req) {
  try {
    const formData = await req.formData();
    const title = formData.get("title");
    const ingredients = formData.get("ingredients");
    const instructions = formData.get("instructions");
    const userId = formData.get("userId");
    const image = formData.get("image");

    if (!title || !ingredients || !instructions || !userId || !image) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    // อัปโหลดภาพไปยัง Cloudinary (หรือ Storage อื่น)
    const imageBuffer = await image.arrayBuffer();
    const base64Image = Buffer.from(imageBuffer).toString("base64");
    const dataUrl = `data:${image.type};base64,${base64Image}`;

    // บันทึกลงฐานข้อมูล
    await connectMongoDB();
    const newRecipe = await Recipe.create({
      title,
      ingredients,
      instructions,
      userId,
      imageUrl: dataUrl, // ใช้ base64 เก็บรูปภาพ หรือเก็บ URL หากอัปโหลดไป Cloud
    });

    return NextResponse.json({ message: "Recipe created.", recipe: newRecipe }, { status: 201 });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "An error occurred.", error: error.message }, { status: 500 });
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const { title, ingredients, instructions } = await req.json();

    if (!title || !ingredients || !instructions) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    await connectMongoDB();
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      { title, ingredients, instructions },
      { new: true } // เพื่อคืนค่าข้อมูลที่อัปเดตแล้ว
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