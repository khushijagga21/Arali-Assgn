"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import styles from "./permissions.module.css";

interface Permission {
  id: string;
  name: string;
  description: string | null;
  created_at: string;
}

export default function PermissionsPage() {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [newPermission, setNewPermission] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    const { data, error } = await supabase.from("permissions").select("*").order("created_at", { ascending: true });
    if (!error && data) {
      setPermissions(data);
    }
  };

  const addPermission = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPermission.trim()) return;

    setLoading(true);
    const { error } = await supabase.from("permissions").insert([{ name: newPermission.trim(), description }]);
    if (!error) {
      setNewPermission("");
      setDescription("");
      fetchPermissions();
    }
    setLoading(false);
  };

  const deletePermission = async (id: string) => {
    const { error } = await supabase.from("permissions").delete().eq("id", id);
    if (!error) {
      fetchPermissions();
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Manage Permissions</h1>

      <form onSubmit={addPermission} className={styles.form}>
        <input
          type="text"
          placeholder="Permission name"
          value={newPermission}
          onChange={(e) => setNewPermission(e.target.value)}
          className={styles.input}
          required
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={styles.input}
        />
        <button type="submit" disabled={loading} className={styles.button}>
          {loading ? "Adding..." : "Add Permission"}
        </button>
      </form>

      <ul className={styles.list}>
        {permissions.map((permission) => (
          <li key={permission.id} className={styles.listItem}>
            <div>
              <strong>{permission.name}</strong>
              {permission.description && <p className={styles.desc}>{permission.description}</p>}
            </div>
            <button onClick={() => deletePermission(permission.id)} className={styles.deleteBtn}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
