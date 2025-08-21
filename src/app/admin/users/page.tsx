"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import styles from "../../../styles/dashboard.module.scss";

export default function AdminDashboard() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/properties")
      .then((res) => res.json())
      .then((data) => setProperties(data));
  }, []);

  const verifyProperty = async (id: string) => {
    await fetch(`http://localhost:3001/properties/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ verified: true }),
    });
    setProperties((prev) =>
      prev.map((p) => (p.id === id ? { ...p, verified: true } : p))
    );
  };

  if (!user || user.role !== "admin") return <p>Access Denied</p>;

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold">Admin Dashboard</h1>
      <h2 className="mt-4 mb-2 font-semibold">Manage Properties</h2>
      {properties.map((p) => (
        <div key={p.id} className="border p-4 my-2">
          <h2>{p.title}</h2>
          <p>Verified: {p.verified ? "Yes" : "No"}</p>
          {!p.verified && (
            <button
              onClick={() => verifyProperty(p.id)}
              className="bg-blue-600 text-white px-2 py-1 rounded"
            >
              Verify
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
