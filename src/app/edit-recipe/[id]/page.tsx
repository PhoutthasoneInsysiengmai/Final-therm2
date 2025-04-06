"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Link from "next/link";
import Button from "@/app/components/button";

export default function EditRecipePage() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState<File | null>(null); // เพิ่ม state สำหรับรูปภาพใหม่
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();
  const params = useParams();
  const recipeId = params.id;

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`/api/recipes/${recipeId}`);
        const data = await res.json();
        if (res.ok) {
          setTitle(data.title);
          setIngredients(data.ingredients);
          setInstructions(data.instructions);
        } else {
          setError("Failed to fetch recipe.");
        }
      } catch (error) {
        setError("An error occurred. Please try again.");
      }
    };
    fetchRecipe();
  }, [recipeId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !ingredients || !instructions) {
      setError("Please fill in all fields!");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("ingredients", ingredients);
      formData.append("instructions", instructions);
      if (image) {
        formData.append("image", image); // เพิ่มรูปภาพใหม่ใน FormData
      }

      const res = await fetch(`/api/recipes/${recipeId}`, {
        method: "PUT",
        body: formData, // ส่ง FormData แทน JSON
      });

      if (res.ok) {
        setSuccess("Recipe updated successfully!");
        setError("");
        router.push("/menu");
      } else {
        setError("Failed to update recipe.");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2 className="title">Edit Recipe</h2>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          placeholder="Recipe Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
        />
        <textarea
          placeholder="Ingredients"
          value={ingredients}
          onChange={(e) => setIngredients(e.target.value)}
          className="input"
        />
        <textarea
          placeholder="Instructions"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
          className="input"
        />
        {/* เพิ่ม input สำหรับอัปโหลดรูปภาพใหม่ */}
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files?.[0] || null)}
          className="input"
        />
        <Button type="submit">Save Recipe</Button>
      </form>
      <p className="linkText">
        <Link href="/menu" className="link">
          Back to Menu
        </Link>
      </p>
    </div>
  );
}