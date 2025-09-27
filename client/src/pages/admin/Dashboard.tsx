// admin/Dashboard.tsx
import React, { useState } from "react";
import { useEffect, useState as useState2 } from "react";
import AdminLayout from "../../components/AdminLayout";

type Order = {
  name: string;
  email: string;
  service: string;
  package: string;
  amount: number;
  whatsapp: string;
  createdAt: string;
};

function Orders() {
  const [orders, setOrders] = useState2<Order[]>([]);
  useEffect(() => {
    fetch("/api/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, []);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <h2 className="text-2xl font-bold mb-4 text-primary">Orders</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border text-sm bg-card">
          <thead>
            <tr className="bg-muted text-foreground">
              <th className="border px-2 py-1">Transaction #</th>
              <th className="border px-2 py-1">Name</th>
              <th className="border px-2 py-1">Email</th>
              <th className="border px-2 py-1">Service</th>
              <th className="border px-2 py-1">Package</th>
              <th className="border px-2 py-1">Amount</th>
              <th className="border px-2 py-1">WhatsApp</th>
              <th className="border px-2 py-1">Date</th>
            </tr>
          </thead>
          <tbody>
            {orders.length === 0 ? (
              <tr>
                <td colSpan={8} className="border px-2 py-6 text-center text-muted-foreground">No orders found.</td>
              </tr>
            ) : (
              orders.map((order, idx) => (
                <tr key={idx} className="hover:bg-muted/50">
                  <td className="border px-2 py-1 font-mono text-xs">ACH{order.createdAt ? new Date(order.createdAt).getTime().toString().slice(-6) : idx.toString().padStart(6, '0')}</td>
                  <td className="border px-2 py-1">{order.name}</td>
                  <td className="border px-2 py-1">{order.email}</td>
                  <td className="border px-2 py-1">{order.service}</td>
                  <td className="border px-2 py-1">{order.package}</td>
                  <td className="border px-2 py-1">₦{order.amount?.toLocaleString()}</td>
                  <td className="border px-2 py-1">{order.whatsapp}</td>
                  <td className="border px-2 py-1">{order.createdAt ? new Date(order.createdAt).toLocaleString() : ''}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
import Messages from "./Messages";
import Portfolio from "./Portfolio";
import Testimonials from "./Testimonials";
import Newsletter from "./newsletter";

export default function Dashboard() {
  const [active, setActive] = useState("dashboard");

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <AdminLayout>
      <div className="flex-1 p-6">
        {active === "dashboard" && (
          <div>
            <h1 className="text-3xl font-bold mb-6">Welcome to Admin Dashboard</h1>
            <Orders />
          </div>
        )}
        {active === "messages" && <Messages />}
        {active === "portfolio" && <Portfolio />}
        {active === "testimonials" && <Testimonials />}
        {active === "newsletter" && <Newsletter />}
      </div>
    </AdminLayout>
  );
}
