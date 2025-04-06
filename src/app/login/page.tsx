"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const { data: session } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (session) {
            router.replace("/");
        }
    }, [session, router]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });
            if (res?.error) {
                setError("Invalid credentials");
                return;
            }
            router.replace("/");
        } catch (error) {
            setError("Something went wrong");
        }
    };

  return (
    <div className="container">
    <h2 className="title">Login</h2>
    {error && <p className="error">{error}</p>}
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


