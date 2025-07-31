"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

// Define types for user and role
type User = {
  id: string;
  email: string;
};

type Role = {
  id: string;
  name: string;
};

export default function AssignRolesPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  // Fetch users and roles
  useEffect(() => {
    const fetchData = async () => {
      // Fetch users from Supabase Auth
      const { data: userData, error: userError } = await supabase.auth.admin.listUsers();
      if (!userError && userData?.users) {
        // Map Supabase users to User type
        const mappedUsers: User[] = userData.users.map((u) => ({
          id: u.id,
          email: u.email ?? "No Email",
        }));
        setUsers(mappedUsers);
      }

      // Fetch roles from roles table
      const { data: roleData, error: roleError } = await supabase.from("roles").select("*");
      if (!roleError && roleData) {
        setRoles(roleData as Role[]);
      }
    };

    fetchData();
  }, []);

  // Handle Assign Role
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
        {/* User Dropdown */}
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

        {/* Role Dropdown */}
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
          cursor: "pointer",
        }}
      >
        Assign Role
      </button>

      {message && <p style={{ marginTop: "1rem", color: "green" }}>{message}</p>}
    </div>
  );
}
