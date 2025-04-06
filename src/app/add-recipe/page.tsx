"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Button from "../components/button";


export default function AddRecipePage() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState<File | null>(null); // เพิ่ม state สำหรับรูปภาพ
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { data: session } = useSession();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (!title || !ingredients || !instructions || !image) {
      setError("Please fill in all fields and upload an image!");
      return;
    }
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("ingredients", ingredients);
      formData.append("instructions", instructions);
      formData.append("userId", session?.user?.id || "");
      formData.append("image", image); // เพิ่มรูปภาพใน FormData
  
      const res = await fetch("/api/recipes", {
        method: "POST",
        body: formData, // ส่ง FormData แทน JSON
      });
  
      if (res.ok) {
        setSuccess("Recipe added successfully!");
        setError("");
        router.push("/menu");
      } else {
        const errorData = await res.json();
        setError(errorData.message || "Failed to add recipe.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };
  
  return (
    <div className="add-recipe-container">
      <h2>Add Recipe</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit} className="form-add-recipe">
        <input
          type="text"
          placeholder="FoodName......."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
        />
        <textarea
          placeholder="Ingredients......."
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="input"
        />
        <textarea
          placeholder="Instructions......."
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="input"
        />
        {/* เพิ่ม input สำหรับอัปโหลดรูปภาพ */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="input"
        />
        <Button type="submit">Add Recipe</Button>
      </form>
      <p className="linkText">
        <Link href="/menu" className="link">
          Back to Menu
        </Link>
      </p>
    </div>
  );
}