"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function AssignRolesPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // Fetch users and roles on mount
  useEffect(() => {
    const fetchData = async () => {
      // Fetch users from Supabase auth
      const { data: userData, error: userError } = await supabase.auth.admin.listUsers();
      if (!userError && userData) setUsers(userData.users);

      // Fetch roles from roles table
      const { data: roleData, error: roleError } = await supabase.from("roles").select("*");
      if (!roleError && roleData) setRoles(roleData);
    };

    fetchData();
  }, []);

  const handleAssign = async () => {
    if (!selectedUser || !selectedRole) {
      setMessage("Please select a user and a role");
      return;
    }

    const { error } = await supabase.from("user_roles").insert([
      {
        user_id: selectedUser,
        role_id: selectedRole,
      },
    ]);

    if (error) {
      setMessage("Error assigning role: " + error.message);
    } else {
      setMessage("Role assigned successfully!");
    }
  };

  return (
    <div style={{ maxWidth: "600px", margin: "2rem auto", textAlign: "center" }}>
      <h1>Assign Roles to Users</h1>

      <div style={{ marginBottom: "1rem" }}>
        <select
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
          style={{ padding: "0.5rem", width: "100%", marginBottom: "1rem" }}
        >
          <option value="">Select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.email}
            </option>
          ))}
        </select>

        <select
          value={selectedRole}
          onChange={(e) => setSelectedRole(e.target.value)}
          style={{ padding: "0.5rem", width: "100%" }}
        >
          <option value="">Select Role</option>
          {roles.map((role) => (
            <option key={role.id} value={role.id}>
              {role.name}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleAssign}
        style={{
          backgroundColor: "#0070f3",
          color: "#fff",
          padding: "0.5rem 1rem",
          borderRadius: "5px",
          border: "none",
        }}
      >
        Assign Role
      </button>

      {message && <p style={{ marginTop: "1rem", color: "green" }}>{message}</p>}
    </div>
  );
}
