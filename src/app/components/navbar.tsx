import Link from "next/link";
import Image from "next/image";
import { Sun, Moon } from "lucide-react";
import { signOut } from "next-auth/react";

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (mode: boolean) => void;
  session: any;
  onSearch: (query: string) => void; // ຟັງຊັ່ນສຳຫລັບຄົ້ນຫາ
}

const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode, session, onSearch }) => {
  return (
    <nav className="navbar">
      <Image src="/logo.png" alt="logo" width={120} height={120} />
      <input
        type="text"
        placeholder=" Search your recipe ............................."
        className="Search-box"
        onChange={(e) => onSearch(e.target.value)} // ເອີ້ນໃຊ້ຟັງຊັ່ນ onSearch ເມື່ອມີການພິມ
      />

      <div className="nav-buttons">
        {session ? ( // ຖ້າສມີ session ສະແດງປູ່ມ Sign Out
          <button className="logout" onClick={() => signOut()}>
            <p className="Linkregister">Sign Out</p>
          </button>
        ) : ( // ຖ້າບໍ່ມີ session ສະແດງປຸ່ມ Sign In ແລະ Sign Up
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
          {darkMode ? <Sun size={25} /> : <Moon size={25} />} {/* ສຳຫລັບໄອຄອນຕາມໂຫມດ */}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

// ອົງປະກອບ Navbar ສໍາລັບການນໍາທາງ

// ມີປ່ອງຊອກຫາທີ່ເອີ້ນຟັງຊັນ onSearch ເມື່ອພິມ.

// ສະແດງປຸ່ມເຂົ້າສູ່ລະບົບ/ອອກຈາກລະບົບຕາມສະຖານະການເຂົ້າສູ່ລະບົບ.

// ມີປຸ່ມເພື່ອປ່ຽນໂໝດມືດ/ແສງ.