"use client"
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function RegisterPage() {
  const [name, setName] = useState(""); // State ສຳຫລັບຊື່
  const [email, setEmail] = useState(""); // State ສຳຫລັບອີເມວ
  const [password, setPassword] = useState(""); // State ສຳຫລັບລະຫັດຜ່ານ
  const [confirmPassword, setConfirmPassword] = useState(""); // State ສຳຫລັບຢືນຢັນລະຫັດຜ່ານ
  const [error, setError] = useState(""); // State ສຳຫລັບຂໍ້ຄວາມ error
  const { data: session } = useSession(); // ດຶງຂໍ້ມູນ session
  if (session) redirect("/"); // ຖ້າມີ session ຢູ່ແລ້ວ redirect ໄປສູ່ຫນ້າເລີ່ມຕົ້ນ

  const [success, setSuccess] = useState(""); // State ສຳຫລັບຂໍ້ຄວາມສຳເລັດ

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // ກວດສອບລະຫັດຜ່ານຄືກັນບໍ່
    if (password !== confirmPassword) {
      setError("Password do not match");
      return;
    }

    // ກວດສອບວ່າຂໍ້ມູນໄດ້ຖືກກອກຄົບບໍ່
    if (!name || !email || !password || !confirmPassword) {
      setError("Please complete all inputs!");
      return;
    }
    try {
      // ກວດສອບວ່າຜູ້ໃຊ້ນີ້ມີຢູ່ແລ້ວບໍ່
      const resCheckUser = await fetch("http://localhost:3000/api/checkUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email })
      })
      const { user } = await resCheckUser.json();

      if (user) {
        setError("User aleardy");
        return;
      }

      // ສົ່ງຂໍ້ມູນໄປຫາ API register
      const res = await fetch("http://localhost:3000/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name, email, password
        })
      })

      if (res.ok) {
        const form = e.target as HTMLFormElement;
        setError("");
        setSuccess("registraion successflly. ")
        form.reset(); // ລີເຊັດຟອມໃຫມ່
      } else {
        console.log("User registered failed.")
      }

    } catch (error) {
      console.log("Error during registration", error)
    }
  };

  return (
    <div className="container">
      <h2 className="title">Register</h2>
      {error && <p className="error">{error}</p>} {/* ສະແດງຂໍ້ຄວາມ error */}
      {success && <p className="success">{success}</p>} {/* ສະແດງຂໍ້ຄວາມສຳເລັດ */}
      <form onSubmit={handleSubmit} className="form">
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} className="input" />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
        <input type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="input" />
        <button type="submit" className="button">Register</button>
      </form>
      <p className="linkText">Already have an account? <Link href="/login" className="link">Login</Link> Page</p>
    </div>
  );
}

export default RegisterPage;

// ຫນ້າລົງທະບຽນສໍາລັບຜູ້ໃຊ້ເພື່ອສະຫມັກສະມາຊິກ.

//ຂໍ້ມູນຖືກກວດສອບຄວາມຖືກຕ້ອງກ່ອນທີ່ຈະສົ່ງໄປຫາ API.

//ກວດເບິ່ງວ່າຜູ້ໃຊ້ນີ້ມີຢູ່ແລ້ວບໍ.

//ຂໍ້ຄວາມຜິດພາດແລະຜົນສໍາເລັດແມ່ນສະແດງຕາມສະຖານະການ.