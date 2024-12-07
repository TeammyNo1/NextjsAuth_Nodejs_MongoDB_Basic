"use client";

import React, { useEffect } from 'react';
import Navbar from '../components/Navbar';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function WelcomePage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push('/login');
    }
  }, [session, router]);

  if (!session) {
    return null; // ป้องกันการเรนเดอร์ก่อนเปลี่ยนเส้นทาง
  }

  return (
    <div>
      <Navbar session={session} />
      <div className="container mx-auto">
        <h3 className="text-3xl my-3">Welcome {session?.user?.name}</h3>
        <p>Email: {session?.user?.email}</p>
        <hr className="my-3" />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti fugiat adipisci earum hic minus soluta eaque illo necessitatibus placeat
          doloribus, quod enim cupiditate dolore nemo, tempora ratione ipsa. Eos, nesciunt?
        </p>
      </div>
    </div>
  );
}

export default WelcomePage;
