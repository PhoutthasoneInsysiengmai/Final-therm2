import { NextResponse } from "next/server";
import { connectMongoDB } from "../../../../../lib/mongodb";
import Recipe from "../../../../../models/recipe";

export async function DELETE(req, { params }) {
  await connectMongoDB();

  try {
    const { id } = params;
    const deletedRecipe = await Recipe.findByIdAndDelete(id);

    if (!deletedRecipe) {
      return NextResponse.json({ error: "Recipe not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Recipe deleted successfully" }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete recipe" }, { status: 500 });
  }
}

export async function GET(req, { params }) {
  try {
    const { id } = params;

    await connectMongoDB();
    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return NextResponse.json(
        { message: "Recipe not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(recipe, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "An error occurred.", error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req, { params }) {
  try {
    const { id } = params;
    const formData = await req.formData();
    const title = formData.get("title");
    const ingredients = formData.get("ingredients");
    const instructions = formData.get("instructions");
    const image = formData.get("image");

    if (!title || !ingredients || !instructions) {
      return NextResponse.json({ message: "All fields are required." }, { status: 400 });
    }

    await connectMongoDB();

    // หากมีรูปภาพใหม่ ให้แปลงเป็น base64
    let imageUrl = null;
    if (image) {
      const imageBuffer = await image.arrayBuffer();
      const base64Image = Buffer.from(imageBuffer).toString("base64");
      imageUrl = `data:${image.type};base64,${base64Image}`;
    }

    // อัปเดตข้อมูลสูตรอาหาร
    const updatedRecipe = await Recipe.findByIdAndUpdate(
      id,
      {
        title,
        ingredients,
        instructions,
        ...(imageUrl && { imageUrl }), // อัปเดต imageUrl ถ้ามีรูปภาพใหม่
      },
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
export async function POST(req, { params }) {
  try {
    const { id } = params;
    const { userId } = await req.json();

    await connectMongoDB();
    const recipe = await Recipe.findById(id);

    if (!recipe) {
      return NextResponse.json({ message: "Recipe not found." }, { status: 404 });
    }

    // ตรวจสอบว่าผู้ใช้เคยกด Like ไว้หรือไม่
    const isLiked = recipe.likes.includes(userId);

    if (isLiked) {
      // ถ้าเคย Like ไว้แล้ว ให้ Unlike
      recipe.likes = recipe.likes.filter((like) => like.toString() !== userId);
    } else {
      // ถ้ายังไม่เคย Like ให้เพิ่ม Like
      recipe.likes.push(userId);
    }

    await recipe.save();

    return NextResponse.json(
      { message: isLiked ? "Unliked successfully." : "Liked successfully.", recipe },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({ message: "An error occurred.", error: error.message }, { status: 500 });
  }
}