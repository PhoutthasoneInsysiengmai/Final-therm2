"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function LoginPage() {
    const [email, setEmail] = useState(""); // State ສຳຫລັບອີເມວ
    const [password, setPassword] = useState(""); // State ສຳຫລັບລະຫັດຜ່ານ
    const [error, setError] = useState(""); // State ສຳຫລັບຂໍ້ຄວາມ error
    const { data: session } = useSession(); // ດຶງຂໍ້ມູນ session
    const router = useRouter(); // ໃຊ້ router ສຳຫລັບການ redirect

    // ຖ້າມີ session ໃຫ້ redirect ໄປສູ່ຫນ້າເລີ່ມຕົ້ນ
    useEffect(() => {
        if (session) {
            router.replace("/");
        }
    }, [session, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // ເອີ້ນໃຊ້ signIn ຂອງ next-auth
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });
            if (res?.error) {
                setError("Invalid credentials");
                return;
            }
            router.replace("/"); // Login ສຳເລັດ redirect ໄປສູ່ຫນ້າເລີ່ມຕົ້ນ
        } catch (error) {
            setError("Something went wrong");
        }
    };

  return (
    <div className="container">
    <h2 className="title">Login</h2>
    {error && <p className="error">{error}</p>} {/* ສະແດງຂໍ້ຄວາມ error */}
    <form onSubmit={handleSubmit} className="form">
      <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="input" />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
      <button type="submit" className="button">Login</button>
    </form>
    <p className="linkText">Do you have an account? <Link href="/register" className="link">Register</Link> Page</p>
  </div>
  );
}

export default LoginPage;


// ຫນ້າເຂົ້າສູ່ລະບົບສໍາລັບຜູ້ໃຊ້ເຂົ້າສູ່ລະບົບ.

// ໃຊ້ລະບົບການພິສູດຢືນຢັນຈາກການກວດສອບຕໍ່ໄປ.

// ເຊດຊັນ ແລະ ການປ່ຽນເສັ້ນທາງຖືກກວດສອບໂດຍອີງຕາມສະຖານະເຂົ້າສູ່ລະບົບ.

// ສະແດງຂໍ້ຄວາມຜິດພາດເມື່ອເຂົ້າສູ່ລະບົບບໍ່ສຳເລັດ.