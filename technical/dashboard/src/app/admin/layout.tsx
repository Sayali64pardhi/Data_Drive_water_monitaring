"use client"
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "../../components/admin/AdminShell";
import { useAuth } from "@/hooks/useAuth";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (!user || user.role !== "admin") {
        router.push("/admin/login");
      }
    }
  }, [user, loading, router]);

  return <AdminShell>{children}</AdminShell>;
}
