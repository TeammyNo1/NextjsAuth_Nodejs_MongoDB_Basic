"use client"


import Navbar from "./components/Navbar";
import { useSession } from "next-auth/react";

export default function Home() {

  const { data: session } = useSession();

  return (
    <main>
        <Navbar session={session} />
          <div className="container mx-auto">
            <h3 className="text-3xl my-3" >Welcome To Home Page</h3>
            <hr className="my-3"/>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dicta pariatur voluptatum est distinctio quia illo perferendis mollitia numquam omnis ducimus, nam cum perspiciatis similique recusandae. Facere vel dolorem ut odit!</p>
          </div>
    </main>
    
  );
}
