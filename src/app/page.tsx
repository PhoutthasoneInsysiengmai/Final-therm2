"use client";
import { useState, useEffect } from "react";
import Navbar from "./components/navbar";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { AiFillExclamationCircle } from "react-icons/ai";
import { MdOutlineRestaurantMenu } from "react-icons/md";
import { IoIosAddCircle } from "react-icons/io";
import Carousel from "./components/carousel";

interface Recipe {
  _id: string;
  title: string;
  ingredients: string;
  instructions: string;
  imageUrl: string;
}

const Home: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false); // สถานะโหมด Dark/Light
  const { data: session } = useSession(); // ข้อมูล session ผู้ใช้
  const router = useRouter(); // ใช้สำหรับการเปลี่ยนหน้า
  const [searchQuery, setSearchQuery] = useState(""); // ค่าในการค้นหา
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]); // สูตรอาหารที่กรองแล้ว
  const [recipes, setRecipes] = useState<Recipe[]>([]); // สูตรอาหารทั้งหมด

  // ถ้าไม่มี session ให้ redirect ไปหน้า login
  useEffect(() => {
    if (!session) {
      router.replace("/login");
    }
  }, [session, router]);

  // ดึงข้อมูลสูตรอาหารจาก API
  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch("/api/recipes", {
          method: "GET",
        });
        if (res.ok) {
          const data = await res.json();
          setRecipes(data.recipes);
          setFilteredRecipes(data.recipes); // ตั้งค่าเริ่มต้นให้ filteredRecipes
        } else {
          console.error("Failed to fetch recipes.");
        }
      } catch (error) {
        console.error("An error occurred while fetching recipes:", error);
      }
    };
    fetchRecipes();
  }, []);

  // ฟังก์ชันค้นหาสูตรอาหาร
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  if (!session) {
    return null; // ถ้าไม่มี session ไม่แสดงอะไร
  }

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      {/* ส่ง props ไปยัง Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        session={session}
        onSearch={handleSearch}
      />
      <hr />
      <div className="mt-10">
        <Carousel /> {/* แสดง Carousel */}
      </div>
      <hr />
      <div className="bottom">
        {/* ปุ่มเพิ่มสูตรอาหาร */}
        <div className="icon-add">
          <IoIosAddCircle className="icon" />
          <Link href="/add-recipe"><button>Add-recipe</button> </Link>
        </div>

        {/* ปุ่มเมนูสูตรอาหาร */}
        <div className="icon-add">
          <MdOutlineRestaurantMenu className="icon" />
          <Link href="/menu"><button>Menu</button></Link>
        </div>

        {/* ปุ่มเกี่ยวกับเรา */}
        <div className="icon-add">
          <AiFillExclamationCircle className="icon" />
          <Link href="/about"><button>about</button></Link>
        </div>
      </div>
      <hr />
      {/* แสดงรายการสูตรอาหารที่ค้นหา */}
      <div className="recipe-list-1">
        {filteredRecipes.map((recipe) => (
          <div key={recipe._id} className="recipe-card">
            <img src={recipe.imageUrl} alt={recipe.title} className="recipe-image" />
            <div className="recipe-details">
              <h3 className="recipe-title">{recipe.title}</h3>
              <p className="recipe-ingredients">{recipe.ingredients}</p>
              <div className="button-group">
                <Link href={`/recipe-detail/${recipe._id}`}>
                  <button className="view-details">View Details</button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <footer className="footer">ສະຫງວນລິຂະສິດ &copy; {new Date().getFullYear()}</footer>
    </div>
  );
};

export default Home;

// ຫນ້າທໍາອິດຄໍາຮ້ອງສະຫມັກ

// ມີລະບົບ Dark/Light Mode.

// ສະແດງ Carousel ແລະບັນຊີລາຍຊື່ສູດ

// ມີປ່ອງຊອກຫາບ່ອນທີ່ສູດອາຫານສາມາດຖືກກັ່ນຕອງ.

// ມີການເຊື່ອມຕໍ່ກັບຫນ້າຕ່າງໆເຊັ່ນ: ເພີ່ມສູດ, ເມນູ, ກ່ຽວກັບພວກເຮົາ.