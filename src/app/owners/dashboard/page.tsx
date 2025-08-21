"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function OwnerDashboard() {
  const user = useSelector((state: any) => state.auth.user);
  const [properties, setProperties] = useState<any[]>([]);
  const [title, setTitle] = useState("");

  // Fetch properties owned by this user
  useEffect(() => {
    if (!user) return;
    fetch(`http://localhost:3001/properties?ownerId=${user.id}`)
      .then((res) => res.json())
      .then(setProperties);
  }, [user]);

  // Add property
  const addProperty = async () => {
    if (!title) return;
    const newProp = {
      title,
      ownerId: user.id,
      verified: false
    };

    await fetch("http://localhost:3001/properties", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProp)
    });

    setTitle("");
    location.reload();
  };

  // Delete property
  const deleteProperty = async (id: number) => {
    await fetch(`http://localhost:3001/properties/${id}`, {
      method: "DELETE"
    });
    setProperties(properties.filter((p) => p.id !== id));
  };

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Owner Dashboard</h1>

      <div className="mb-4">
        <input
          placeholder="New Property Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 mr-2"
        />
        <button
          onClick={addProperty}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Add Property
        </button>
      </div>

      <ul>
        {properties.map((p) => (
          <li key={p.id} className="border p-2 rounded mb-2 flex justify-between">
            {p.title} {p.verified ? "✅" : "❌"}
            <button
              onClick={() => deleteProperty(p.id)}
              className="bg-red-600 text-white px-2 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}