"use client";

import React, { useState } from "react"; // Correctly importing `useState`
import Navbar from "../components/Navbar";
import Link from "next/link";
import {useSession} from 'next-auth/react'
import {redirect} from 'next/navigation'; // แก้จาก redireact เป็น redirect


function Register() {
  // Correctly using `useState` as an array
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [sucess, setSucces] = useState("");

  const { data: session } = useSession();
    if (session) redirect('welcome');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!name || !email || !password || !confirmpassword) {
      setError("Please complete all inputs!");
      return;
    }

    // Handle successful form submission logic here
    console.log("Form submitted:", { name, email, password, confirmpassword });

    try{

      const resCheckUser = await fetch("http://localhost:3000/api/checkUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email })
        })

        const { user } = await resCheckUser.json();

        if (user) { 
            setError("User already exists.");
            return;
        }

      const res = await fetch("http://localhost:3000/api/register",{
        method: "POST" ,
        headers:{
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
        name, email, password,
        })

      })

      if(res.ok){
        const form = e.target;
        setError("");
        setSucces("User registration successfully!");
        form.reset();
      } else {
        console.log("User registration failed.")
      }

    } catch(error){
      console.log("Error During registrantion:", error);
    }

  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-5">
        <h2>Register Page</h2>
        <hr className="my-3" />
        <form onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
              {error}
            </div>
          )}
          {sucess && (
            <div className="bg-green-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
              {sucess}
            </div>
          )}
          <input
            onChange={(e) => setName(e.target.value)}
            className="block bg-gray-300 p-2 my-2 rounded-md"
            type="text"
            placeholder="Enter Your Name"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            className="block bg-gray-300 p-2 my-2 rounded-md"
            type="email"
            placeholder="Enter Your Email"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            className="block bg-gray-300 p-2 my-2 rounded-md"
            type="password"
            placeholder="Enter Your Password"
          />
          <input
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="block bg-gray-300 p-2 my-2 rounded-md"
            type="password"
            placeholder="Confirm Your Password"
          />
          <button type="submit" className="bg-green-500 p-2 rounded-md text-white">
            Sign Up
          </button>
        </form>
        <hr className="my-3" />
        <p>
          Already have an account? Go to{" "}
          <Link className="text-blue-500 hover:underline" href="/login">
            Login
          </Link>{" "}
          Page
        </p>
      </div>
    </div>
  );
}

export default Register;
