"use client";

import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { data: session } = useSession();

  // Redirect if already logged in
  useEffect(() => {
    if (session) {
      router.replace("/welcome");
    }
  }, [session, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false, // Prevent auto-redirect by next-auth
      });

      if (res.error) {
        setError("Invalid credentials");
        return;
      }

      // Redirect to welcome page after successful login
      router.replace("/welcome");
    } catch (error) {
      console.log(error);
    }
  };

  if (session) {
    return null; // Prevent rendering login form if already logged in
  }

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-5">
        <h2>Login Page</h2>
        <hr className="my-3" />
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}

          <input
            onChange={(e) => setEmail(e.target.value)}
            className="block bg-gray-300 p-2 my-2 rounded-md"
            type="email"
            placeholder="Enter Your Email"
            required
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="block bg-gray-300 p-2 my-2 rounded-md"
            type="password"
            placeholder="Enter Your Password"
            required
          />
          <button type="submit" className="bg-green-500 p-2 rounded-md text-white">
            Sign In
          </button>
        </form>
        <hr className="my-3" />
        <p>
          Do not have an account? Go to{" "}
          <Link className="text-blue-500 hover:underline" href="/register">
            Register
          </Link>{" "}
          Page
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
