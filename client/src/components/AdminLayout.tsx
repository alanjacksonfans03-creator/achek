import React from "react";
import AdminSidebar from "./AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // Add top padding to prevent navbar overlap (assume navbar height 80px)
  return (
    <div style={{ display: "flex" }}>
      <AdminSidebar />
      <div
        style={{
          marginLeft: 220,
          width: "100%",
          minHeight: "100vh",
          background: "#f9fafb",
          paddingTop: 88, // 80px navbar + 8px gap
        }}
      >
        {children}
      </div>
    </div>
  );
}