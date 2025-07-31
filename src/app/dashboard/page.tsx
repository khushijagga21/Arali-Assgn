"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import styles from "./dashboard.module.css";

type User = {
  email: string;
};

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function getUser() {
      const { data } = await supabase.auth.getUser();
      if (data?.user?.email) {
        setUser({ email: data.user.email });
      }
    }
    getUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <div className={styles.container}>
      {/* Header Section */}
      <div className={styles.header}>
        <h1 className={styles.title}>RBAC Control Panel</h1>
        {user && <p className={styles.welcome}>Welcome, {user.email}</p>}
        <button className={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Card Navigation Section */}
      <div className={styles.cardGrid}>
        <a href="/roles" className={styles.card}>
          <h2>Manage Roles</h2>
          <p>Create, edit, and delete user roles.</p>
        </a>

        <a href="/permissions" className={styles.card}>
          <h2>Manage Permissions</h2>
          <p>Define and control user permissions.</p>
        </a>

        <a href="/assign" className={styles.card}>
          <h2>Assign Permissions</h2>
          <p>Link permissions to roles easily.</p>
        </a>
      </div>
    </div>
  );
}
