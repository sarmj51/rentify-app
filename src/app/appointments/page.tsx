"use client";

import { useState } from "react";
import { useSelector } from "react-redux";

export default function BookViewingPage() {
  const [propertyId, setPropertyId] = useState("");
  const [date, setDate] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const user = useSelector((state: any) => state.auth.user);

  const handleBooking = async () => {
    if (!user) return;

    const booking = {
      tenantId: user.id,
      propertyId,
      date,
      status: "Pending",
      ownerId: 4 // normally you’d fetch property.ownerId
    };

    await fetch("http://localhost:3001/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking)
    });

    setConfirmation("Appointment booked successfully!");
  };

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Book a Viewing</h1>

      <input
        placeholder="Property ID"
        value={propertyId}
        onChange={(e) => setPropertyId(e.target.value)}
        className="border p-2 rounded mb-2 block"
      />

      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="border p-2 rounded mb-2 block"
      />

      <button
        onClick={handleBooking}
        className="bg-green-600 text-white px-4 py-2 rounded"
      >
        Book Viewing
      </button>

      {confirmation && <p className="text-green-600 mt-2">{confirmation}</p>}
    </div>
  );
}