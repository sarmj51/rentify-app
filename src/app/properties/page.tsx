"use client";

import Image from 'next/image';
import { useEffect, useState } from 'react';
import styles from './properties.page.module.scss';
import Link from 'next/link';

async function getProperties() {
    const propertyResponse = await fetch('http://localhost:3001/properties', {
        cache: "no-store",
    });

    return propertyResponse.json();
}
export default function PropertiesPage() {
    const [properties, setProperties] = useState<any[]>([]);

    useEffect(() => {
        getProperties()
            .then((data) => setProperties(data))
            .catch((error) => console.error('Error fetching properties:', error));
    }, []);

    return (
        <div className={styles.properties}>
            <h1> Available Properties </h1>
            <div className={styles.grid}>
                {properties.map((property) => (
                    <div key={property.id} className={styles.card}>
                        <Image
                            src={property.images?.[0] || "/placeholder.jpg"}
                            alt={property.title || "Property Image"}
                            width={300}
                            height={300}
                        />
                        <div className={styles.content}>
                            <h2>{property.title}</h2>
                            <p>{property.city} · {property.type}</p>
                            <p className={styles.price}>${property.price}/month</p>
                            <Link href={`/properties/${property.id}`} className={styles.link}>
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
