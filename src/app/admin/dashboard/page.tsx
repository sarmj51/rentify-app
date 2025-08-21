"use client";

import { useEffect, useState } from "react";

export default function AdminDashboard() {
  const [users, setUsers] = useState<any[]>([]);
  const [properties, setProperties] = useState<any[]>([]);
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:3001/users").then((res) => res.json()).then(setUsers);
    fetch("http://localhost:3001/properties").then((res) => res.json()).then(setProperties);
    fetch("http://localhost:3001/appointments").then((res) => res.json()).then(setAppointments);
  }, []);

  const deleteUser = async (id: number) => {
    await fetch(`http://localhost:3001/users/${id}`, { method: "DELETE" });
    setUsers(users.filter((u) => u.id !== id));
  };

  const approveProperty = async (id: number) => {
    await fetch(`http://localhost:3001/properties/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ verified: true })
    });
    setProperties(properties.map((p) => (p.id === id ? { ...p, verified: true } : p)));
  };

  return (
    <div className="p-8 grid grid-cols-3 gap-6">
      {/* Users */}
      <div>
        <h2 className="text-lg font-bold mb-2">Users</h2>
        {users.map((u) => (
          <div key={u.id} className="border p-2 mb-2 rounded flex justify-between">
            {u.email} ({u.role})
            <button onClick={() => deleteUser(u.id)} className="bg-red-600 text-white px-2 py-1 rounded">
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Properties */}
      <div>
        <h2 className="text-lg font-bold mb-2">Properties</h2>
        {properties.map((p) => (
          <div key={p.id} className="border p-2 mb-2 rounded flex justify-between">
            {p.title} {p.verified ? "✅" : "❌"}
            {!p.verified && (
              <button onClick={() => approveProperty(p.id)} className="bg-green-600 text-white px-2 py-1 rounded">
                Approve
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Appointments */}
      <div>
        <h2 className="text-lg font-bold mb-2">Appointments</h2>
        {appointments.map((a) => (
          <div key={a.id} className="border p-2 mb-2 rounded">
            Tenant {a.tenantId} – Property {a.propertyId} – {a.date} – {a.status}
          </div>
        ))}
      </div>
    </div>
  );
}