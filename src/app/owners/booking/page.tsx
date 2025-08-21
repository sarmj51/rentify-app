"use client";

import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function OwnerBookings() {
  const user = useSelector((state: any) => state.auth.user);
  const [appointments, setAppointments] = useState<any[]>([]);

  useEffect(() => {
    if (!user) return;
    fetch(`http://localhost:3001/appointments?ownerId=${user.id}`)
      .then((res) => res.json())
      .then(setAppointments);
  }, [user]);

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Bookings for My Properties</h1>
      {appointments.length === 0 && <p>No bookings yet.</p>}
      <ul>
        {appointments.map((a) => (
          <li key={a.id} className="border p-2 mb-2 rounded">
            Tenant {a.tenantId} – Property {a.propertyId} – {a.date} – {a.status}
          </li>
        ))}
      </ul>
    </div>
  );
}