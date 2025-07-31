"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

import styles from "./home.module.css";
import Link from "next/link";

export default function HomePage() {
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUserEmail(data.user?.email || null);
    };
    getUser();
  }, []);

  return (
    <>
     
      <div className={styles.container}>
        <h1 className={styles.title}>Welcome to the RBAC Control Tool</h1>
        <p className={styles.subtitle}>
          Manage roles, permissions, and access control with ease.
        </p>

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
