"use client"
import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { data: session } = useSession();
  if (session) redirect("/");

  const [success, setSuccess] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Password do not match");
      return;
    }

    if (!name || !email || !password || !confirmPassword) {
      setError("Please complete all inputs!");
      return;
    }
    try {

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
        form.reset();

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
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}
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
