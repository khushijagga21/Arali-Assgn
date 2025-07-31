"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import Navbar from "@/components/Navbar"; // Ensure you have Navbar.tsx in components
import styles from "./home.module.css";

export default function HomePage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUserEmail(data.user?.email || null);
    };
    fetchUser();
  }, []);

  return (
    <>
      {/* Navbar at top */}
      <Navbar />

      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to the RBAC Control Tool</h1>
        <p className={styles.subtitle}>
          Manage roles, permissions, and access control with ease.
        </p>

        {userEmail && <p className={styles.userEmail}>Logged in as: {userEmail}</p>}

        <div className={styles.cards}>
          <Link href="/dashboard" className={styles.card}>Go to Dashboard</Link>
          <Link href="/roles" className={styles.card}>Manage Roles</Link>
          <Link href="/permissions" className={styles.card}>Manage Permissions</Link>
          <Link href="/assign" className={styles.card}>Assign Permissions</Link>
          <Link href="/reverse-lookup" className={styles.card}>Reverse Lookup</Link>
        </div>
      </div>
    </>
  );
}
