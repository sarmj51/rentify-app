"use client";

import { useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useParams, useRouter } from "next/navigation";
import styles from "@/styles/dashboard.module.scss";

export default function BookAppointmentPage() {
  const { id } = useParams();
  const user = useSelector((state: RootState) => state.auth.user);
  const [date, setDate] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    await fetch("http://localhost:3001/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: Date.now().toString(),
        userId: user?.id,
        propertyId: id,
        date,
      }),
    });
    router.push("/appointments");
  };

  if (!user) return <p>Please login as tenant.</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Book Appointment</h1>
      <div className={styles.form}>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <button onClick={handleSubmit} className={styles.button}>
          Confirm Booking
        </button>
      </div>
    </div>
  );
}