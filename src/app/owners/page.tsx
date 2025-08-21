"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import styles from "@/styles/dashboard.module.scss";

export default function OwnerDashboard() {
  const user = useSelector((state: RootState) => state.auth.user);
  const [properties, setProperties] = useState<any[]>([]);

  useEffect(() => {
    if (user?.id) {
      fetch(`http://localhost:3001/properties?ownerId=${user.id}`)
        .then((res) => res.json())
        .then((data) => setProperties(data));
    }
  }, [user]);

  if (!user || user.role !== "owner") return <p>Access Denied</p>;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Properties</h1>
      {properties.map((p) => (
        <div key={p.id} className={styles.card}>
          <h2>{p.title}</h2>
          <p>{p.city}</p>
        </div>
      ))}
    </div>
  );
}