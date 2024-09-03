// app/dashboard/page.js
"use client";

import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  // const router = useRouter();

  // useEffect(() => {
  //   if (status === "unauthenticated") {
  //     router.push("/admin/login");
  //   }
  // }, [status]);

  // if (status === "loading") {
  //   return <p>Loading...</p>;
  // }

  // if (!session) {
  //   return null;
  // }

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {session?.user?.name}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
