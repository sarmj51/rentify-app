import { get } from "http";
import Image from "next/image";

async function getPropertyById(id: string) {
    const propertyResponseById = await fetch(`http://localhost:3001/properties/${id}`, {
        cache: "no-store",
    });
    return propertyResponseById.json();
}

export default async function PropertyDetailsPage({ params }: { params: { id: string } }) {
    const propertyById = await getPropertyById(params.id);

    if(!propertyById) {
        return <p>Property not found</p>;
    }

    return (

        <><div>
            <h1>{propertyById.title}</h1>
            <Image
                src={propertyById.images?.[0] || "/placeholder.jpg"}
                alt={propertyById.title || "Property image"}
                width={600}
                height={400} 
            />
        </div></>
    )
}