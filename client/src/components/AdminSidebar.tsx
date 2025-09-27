import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function AdminSidebar() {
  const location = useLocation();

  const navLinks = [
    { to: "/admin/dashboard", label: "Dashboard" },
    { to: "/admin/newsletter", label: "Newsletter" },
    { to: "/admin/orders", label: "Orders" },
    { to: "/admin/subscribers", label: "Subscribers" },
  ];

  return (
    <aside
      style={{
        width: 220,
        minHeight: "100vh",
        background: "#1d2939",
        color: "#fff",
        position: "fixed",
        left: 0,
        top: 0,
        display: "flex",
        flexDirection: "column",
        zIndex: 100,
      }}
    >
      <div style={{ textAlign: "center", padding: "32px 0 16px 0" }}>
        <img
          src="/public/achek-logo.png"
          alt="Achek Logo"
          style={{ width: 80, margin: "0 auto" }}
        />
      </div>
      <nav style={{ flex: 1 }}>
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {navLinks.map((link) => (
            <li key={link.to}>
              <Link
                to={link.to}
                style={{
                  display: "block",
                  padding: "16px 24px",
                  color: "#fff",
                  textDecoration: "none",
                  background:
                    location.pathname === link.to ? "#2563eb" : "transparent",
                  fontWeight: location.pathname === link.to ? "bold" : "normal",
                }}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li>
            <button
              onClick={() => {
                localStorage.removeItem("adminToken");
                window.location.href = "/admin/login";
              }}
              style={{
                width: "100%",
                marginTop: 32,
                padding: "16px 24px",
                background: "none",
                border: "none",
                color: "#fff",
                textAlign: "left",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </aside>
  );
}