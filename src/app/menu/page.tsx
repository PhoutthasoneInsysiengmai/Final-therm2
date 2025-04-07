"use client";
import { useState, useEffect } from "react";

import Link from "next/link";


interface Recipe {
  _id: string;
  title: string;
  ingredients: string;
  instructions: string;
  imageUrl: string;
}

export default function MenuPage() {
  const [recipes, setRecipes] = useState<Recipe[]>([]); // สูตรอาหารทั้งหมด
  const [error, setError] = useState(""); // ข้อความ error

  // ดึงข้อมูลสูตรอาหารจาก API
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch("/api/recipes", {
          method: "GET",
        });
        if (res.ok) {
          const data = await res.json();
          console.log("API Response:", data);
          setRecipes(data.recipes); // ตั้งค่าข้อมูลสูตรอาหาร
        } else {
          setError("Failed to fetch recipes.");
        }
      } catch (error) {
        setError("An error occurred. Please try again.");
      }
    };
    fetchRecipes();
  }, []);

  // ฟังก์ชันลบสูตรอาหาร
  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("ແນ່ໃຈແລ້ວບໍ່ທີ່ຈະລົບຂໍ້ມູນສູດອາຫານນີ້?");
    if (!confirmDelete) return;

    try {
      const res = await fetch(`/api/recipes/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        setRecipes((prev) => prev.filter((recipe) => recipe._id !== id)); // อัปเดตรายการสูตรอาหารหลังลบ
      } else {
        console.error("Failed to delete recipe");
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  return (

    <div className="menu-page">
      {/* ปุ่มกลับไปหน้าแรก */}
      <div className="home-button">
        <Link href="/">
          <button className="profile-button">Back to Homepage</button>
        </Link>
      </div>
      <div className="menu-container">
        <h2 className="menu-title">Menu</h2>
        {error && <p className="error-message">{error}</p>}
        <div className="recipe-list">
          {/* แสดงรายการสูตรอาหาร */}
          {recipes.map((recipe) => (
            <div key={recipe._id} className="recipe-card">
              <img src={recipe.imageUrl} alt={recipe.title} className="recipe-image" />
              <div className="recipe-details">
                <h3 className="recipe-title">{recipe.title}</h3>
                <p className="recipe-ingredients">{recipe.ingredients}</p>
                <div className="button-group">
                  {/* ปุ่มดูรายละเอียด */}
                  <Link href={`/recipe-detail/${recipe._id}`}>
                    <button className="view-details">View Details</button>
                  </Link>
                  {/* ปุ่มแก้ไข */}
                  <Link href={`/edit-recipe/${recipe._id}`}>
                    <button className="edit-button">Edit</button>
                  </Link>
                  {/* ปุ่มลบ */}
                  <button className="delete-button" onClick={() => handleDelete(recipe._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ปุ่มเพิ่มสูตรอาหารใหม่ */}
        <div className="add-recipe-container">
          <Link href="/add-recipe">
            <button className="add-recipe-button">Add New Recipe</button>
          </Link>
        </div>

      </div>
    </div>
  );

}


//หน้าแสดงเมนูสูตรอาหารทั้งหมด

//มีปุ่มสำหรับดูรายละเอียด, แก้ไข, และลบสูตรอาหาร

//มีการยืนยันก่อนลบข้อมูล

//มีปุ่มสำหรับเพิ่มสูตรอาหารใหม่