"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function checkAuth() {
      const { data } = await supabase.auth.getUser();

      if (data.user) {
        setAuthenticated(true);
      } else {
        setAuthenticated(false);
        router.replace("/login"); // redirect instantly if not logged in
      }

      setLoading(false);
    }

    checkAuth();
  }, [router]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          fontSize: "1.2rem",
          color: "#0070f3",
        }}
      >
        Checking authentication...
      </div>
    );
  }

  return authenticated ? <>{children}</> : null;
}
