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
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const { data: session } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  useEffect(() => {
    if (!session) {
      router.replace("/login");
    }
  }, [session, router]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const res = await fetch("/api/recipes", {
          method: "GET",
        });
        if (res.ok) {
          const data = await res.json();
          setRecipes(data.recipes);
          setFilteredRecipes(data.recipes); // ຕັ່ງຄ່າເລີ່ມຕົ້ນຂອງ filteredRecipes
        } else {
          console.error("Failed to fetch recipes.");
        }
      } catch (error) {
        console.error("An error occurred while fetching recipes:", error);
      }
    };
    fetchRecipes();
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredRecipes(filtered);
  };

  if (!session) {
    return null;
  }

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      {/* ສົ່ງຟັງຊັັ່ນ handleSearch ໄປຫາ Navbar */}
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        session={session}
        onSearch={handleSearch} // ສົ່ງຟັງຊັັນຄຳຄົ້ນຫາ
      />
      <hr />
      <div className="mt-10">
        <Carousel />
      </div>
      <hr />
      <div className="bottom">
        <div className="icon-add">
          <IoIosAddCircle className="icon" />
          <Link href="/add-recipe"><button>Add-recipe</button> </Link>
        </div>

        <div className="icon-add">
          <MdOutlineRestaurantMenu className="icon" />
          <Link href="/menu"><button>Menu</button></Link>
        </div>

        <div className="icon-add">
          <AiFillExclamationCircle className="icon" />
          <Link href="/about"><button>about</button></Link>
        </div>
      </div>
      <hr />
      {/* ສະແດງສູດອາຫານທີ່ຖືກຄົ້ນຫາ */}
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