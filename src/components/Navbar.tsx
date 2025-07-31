"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import styles from "./Navbar.module.css";

export default function Navbar({ userEmail }: { userEmail: string | null }) {
  const router = useRouter();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>RBAC Tool</div>
      <ul className={styles.navLinks}>
        <li><Link href="/home">Home</Link></li>
        <li><Link href="/dashboard">Dashboard</Link></li>
        <li><Link href="/roles">Roles</Link></li>
        <li><Link href="/permissions">Permissions</Link></li>
        <li><Link href="/assign">Assign</Link></li>
        <li><Link href="/reverse-lookup">Reverse Lookup</Link></li>
      </ul>
      <div className={styles.rightSection}>
        {userEmail && <span className={styles.email}>{userEmail}</span>}
        <button onClick={handleLogout} className={styles.logoutButton}>Logout</button>
      </div>
    </nav>
  );
}
