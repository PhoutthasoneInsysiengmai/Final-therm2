"use client";
import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Button from "@/app/components/button";

interface Recipe {
  _id: string;
  title: string;
  ingredients: string;
  instructions: string;
  imageUrl: string;
}

export default function RecipeDetailPage() {
  const [recipe, setRecipe] = useState<Recipe | null>(null);
  const [error, setError] = useState("");
  const params = useParams();
  const recipeId = params.id;

  useEffect(() => {
    const fetchRecipe = async () => {
      try {
        const res = await fetch(`/api/recipes/${recipeId}`);
        const data = await res.json();
        if (res.ok) {
          setRecipe(data);
        } else {
          setError("Failed to fetch recipe.");
        }
      } catch (error) {
        setError("An error occurred. Please try again.");
      }
    };
    fetchRecipe();
  }, [recipeId]);

  if (!recipe) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 pt-20 font-family: Saysettha OT">
      <h2 className="text-3xl font-bold text-center mb-8">{recipe.title}</h2>
      {error && <p className="text-red-500 text-center">{error}</p>}
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg">
        <img
          src={recipe.imageUrl}
          alt={recipe.title}
          className="recipe-image"
        />
        <h3 className="text-xl font-bold mb-2 ">Ingredients:</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{recipe.ingredients}</p>
        <h3 className="text-xl font-bold mb-2">Instructions:</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{recipe.instructions}</p>
        <Link href="/menu">
          <Button className="w-full">Back to Menu</Button>
        </Link>
      </div>
    </div>
  );
}