"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Navbar from "@/components/Navbar";
import styles from "./permissions.module.css";

export default function PermissionsPage() {
  const [permissions, setPermissions] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingPermission, setEditingPermission] = useState<any>(null);

  // Fetch permissions
  const fetchPermissions = async () => {
    const { data, error } = await supabase
      .from("permissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) setPermissions(data || []);
  };

  useEffect(() => {
    fetchPermissions();
  }, []);

  // Add permission
  const addPermission = async () => {
    if (!name) return;
    const { error } = await supabase
      .from("permissions")
      .insert([{ name, description }]);
    if (!error) {
      setName("");
      setDescription("");
      fetchPermissions();
    }
  };

  // Start edit
  const startEdit = (perm: any) => {
    setEditingPermission(perm);
    setName(perm.name);
    setDescription(perm.description);
  };

  // Update permission
  const updatePermission = async () => {
    if (!name) return;
    const { error } = await supabase
      .from("permissions")
      .update({ name, description })
      .eq("id", editingPermission.id);
    if (!error) {
      setName("");
      setDescription("");
      setEditingPermission(null);
      fetchPermissions();
    }
  };

  // Delete permission
  const deletePermission = async (id: string) => {
    const { error } = await supabase.from("permissions").delete().eq("id", id);
    if (!error) fetchPermissions();
  };

  return (
    <>
      <Navbar userEmail={null} />
      <div className={styles.container}>
        <h1 className={styles.title}>Manage Permissions</h1>

        <div className={styles.form}>
          <input
            type="text"
            placeholder="Permission name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          {editingPermission ? (
            <button onClick={updatePermission}>Update</button>
          ) : (
            <button onClick={addPermission}>Add</button>
          )}
        </div>

        <ul className={styles.permissionList}>
          {permissions.map((perm) => (
            <li key={perm.id} className={styles.permissionItem}>
              <div>
                <strong>{perm.name}</strong>
                <p>{perm.description}</p>
              </div>
              <div>
                <button onClick={() => startEdit(perm)}>Edit</button>
                <button onClick={() => deletePermission(perm.id)}>Delete</button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
