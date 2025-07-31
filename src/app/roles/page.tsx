"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import styles from "./roles.module.css";

type Role = {
  id: string;
  name: string;
};

export default function RolesPage() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [roleName, setRoleName] = useState("");
  const [editingRole, setEditingRole] = useState<Role | null>(null);

  // Fetch roles
  const fetchRoles = async () => {
    const { data, error } = await supabase.from("roles").select("*").order("created_at", { ascending: false });
    if (!error && data) setRoles(data as Role[]);
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // Add role
  const addRole = async () => {
    if (!roleName) return;
    const { error } = await supabase.from("roles").insert([{ name: roleName }]);
    if (!error) {
      setRoleName("");
      fetchRoles();
    }
  };

  // Edit role
  const startEdit = (role: Role) => {
    setEditingRole(role);
    setRoleName(role.name);
  };

  const updateRole = async () => {
    if (!roleName || !editingRole) return;
    const { error } = await supabase.from("roles").update({ name: roleName }).eq("id", editingRole.id);
    if (!error) {
      setRoleName("");
      setEditingRole(null);
      fetchRoles();
    }
  };

  // Delete role
  const deleteRole = async (id: string) => {
    const { error } = await supabase.from("roles").delete().eq("id", id);
    if (!error) fetchRoles();
  };

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <h1 className={styles.title}>Manage Roles</h1>

        <div className={styles.form}>
          <input
            type="text"
            placeholder="Enter role name"
            value={roleName}
            onChange={(e) => setRoleName(e.target.value)}
          />
          {editingRole ? (
            <button onClick={updateRole}>Update Role</button>
          ) : (
            <button onClick={addRole}>Add Role</button>
          )}
        </div>

        <ul className={styles.roleList}>
          {roles.map((role) => (
            <li key={role.id} className={styles.roleItem}>
              <span>{role.name}</span>
              <div>
                <button onClick={() => startEdit(role)}>Edit</button>
                <button onClick={() => deleteRole(role.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
