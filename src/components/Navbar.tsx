"use client";

import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import styles from "./Navbar.module.css";

export default function Navbar() {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>RBAC Tool</div>
      <div className={styles.links}>
        <Link href="/home">Home</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/roles">Roles</Link>
        <Link href="/permissions">Permissions</Link>
        <Link href="/assign">Assign</Link>
        <Link href="/reverse-lookup">Reverse Lookup</Link>
      </div>
      <button className={styles.logoutBtn} onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
}
