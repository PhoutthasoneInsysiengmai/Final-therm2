"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

interface Recipe {
  _id: string;
  name: string;
  image: string;
}
const Recipes = () => {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    // ดึงข้อมูลสูตรอาหารจาก API
    fetch("/api/recipes")
      .then((res) => res.json())
      .then((data) => setRecipes(data));
  }, []);

  useEffect(() => {
    // กรองสูตรอาหารที่ตรงกับคำค้นหา
    setFilteredRecipes(
      recipes.filter((recipe) =>
        recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, recipes]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Recipes</h1>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {filteredRecipes.length > 0 ? (
          filteredRecipes.map((recipe) => (
            <div key={recipe._id} className="border p-4 rounded shadow">
              <img src={recipe.image} alt={recipe.name} className="w-full h-40 object-cover" />
              <h2 className="text-lg font-semibold">{recipe.name}</h2>
            </div>
          ))
        ) : (
          <p>No recipes found.</p>
        )}
      </div>
    </div>
  );
};
export default Recipes;
