"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

interface Recipe {
  _id: string;
  title: string;
  ingredients: string;
  instructions: string;
  imageUrl: string;
}

export default function RecipesPage() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || ""; // ค่าค้นหาจาก URL
  const [recipes, setRecipes] = useState<Recipe[]>([]); // รายการสูตรอาหารทั้งหมด
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]); // รายการที่กรองแล้ว
  const [loading, setLoading] = useState(true); // สถานะการโหลด

  // ดึงข้อมูลสูตรอาหารจาก API
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch("/api/recipes");
        const data = await res.json();
        if (res.ok) {
          setRecipes(data.recipes);
          setFilteredRecipes(data.recipes);
        }
      } catch (error) {
        console.error("Error fetching recipes:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, []);

  // กรองสูตรอาหารตามคำค้นหา
  useEffect(() => {
    if (searchQuery) {
      const filtered = recipes.filter(recipe =>
        recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredRecipes(filtered);
    } else {
      setFilteredRecipes(recipes);
    }
  }, [searchQuery, recipes]);

  if (loading) return <div>Loading recipes...</div>;

  return (
    <div className="recipes-container">
      <h1 className="recipes-title">All Recipes</h1>
      
      {/* ผลลัพธ์การค้นหา */}
      <div className="search-results">
        {searchQuery && (
          <p>Search results for: <strong>{searchQuery}</strong></p>
        )}
        <p>Showing {filteredRecipes.length} recipes</p>
      </div>

      {/* รายการสูตรอาหาร */}
      <div className="recipes-grid">
        {filteredRecipes.map(recipe => (
          <div key={recipe._id} className="recipe-card">
            <img 
              src={recipe.imageUrl} 
              alt={recipe.title} 
              className="recipe-image"
            />
            <div className="recipe-content">
              <h2 className="recipe-title">{recipe.title}</h2>
              <div className="recipe-actions">
                <Link href={`/recipe-detail/${recipe._id}`} className="view-button">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ถ้าไม่พบสูตรอาหาร */}
      {filteredRecipes.length === 0 && (
        <div className="no-results">
          <p>No recipes found. Try a different search term.</p>
          <Link href="/recipes" className="clear-search">
            Clear Search
          </Link>
        </div>
      )}
    </div>
  );
}