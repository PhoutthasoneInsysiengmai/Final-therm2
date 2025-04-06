import Link from "next/link";
import Image from "next/image";
import { Sun, Moon } from "lucide-react";
import { signOut } from "next-auth/react";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
  session: any;
  onSearch: (query: string) => void; // ເພີ່ມ prop 
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode, session, onSearch }) => {
  return (
    <nav className="navbar">
      <Image src="/logo.png" alt="logo" width={120} height={120}/>
      <input
        type="text"
        placeholder=" Search your recipe ............................."
        className="Search-box"
        onChange={(e) => onSearch(e.target.value)} // ເອີ້ນໃໍຊ້ຟັງຊັ້ນ onSearch
      />
      
      <div className="nav-buttons">
        {session ? (
          <button className="logout" onClick={() => signOut()}>
            <p className="Linkregister">Sign Out</p>
          </button>
        ) : (
          <>
            <button>
              <p className="Linklogin">
                <Link href="/login">Sign In</Link>
              </p>
            </button>
            <button>
              <p className="Linkregister">
                <Link href="/register">Sign Up</Link>
              </p>
            </button>
          </>
        )}
        <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
          {darkMode ? <Sun size={25} /> : <Moon size={25} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;