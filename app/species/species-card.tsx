import { Button } from "@/components/ui/button";
import type { Database } from "@/lib/schema";
import Image from "next/image";
import { useState } from "react"; // Import useState

type Species = Database["public"]["Tables"]["species"]["Row"];

export default function SpeciesCard(species: Species) {
  const [showDetails, setShowDetails] = useState(false); // State to control the detailed view

  return (
    <div className="min-w-72 m-4 w-72 flex-none rounded border-2 p-3 shadow">
      {species.image && (
        <div className="relative h-40 w-full">
          <Image src={species.image} alt={species.scientific_name} fill style={{ objectFit: "cover" }} />
        </div>
      )}
      <h3 className="mt-3 text-2xl font-semibold">{species.common_name}</h3>
      <h4 className="text-lg font-light italic">{species.scientific_name}</h4>
      <p>{species.description ? species.description.slice(0, 150).trim() + "..." : ""}</p>

      {/* Replace with detailed view */}
      {showDetails ? (
        <div>
          <p>Common Name: {species.common_name}</p>
          <p>Scientific Name: {species.scientific_name}</p>
          <p>Total Population: {species.total_population}</p>
          <p>Kingdom: {species.kingdom}</p>
          <p>Description: {species.description}</p>
          <Button className="mt-3 w-full" onClick={() => setShowDetails(false)}>
            Close Details
          </Button>
        </div>
      ) : (
        <Button className="mt-3 w-full" onClick={() => setShowDetails(true)}>
          Learn More
        </Button>
      )}
    </div>
  );
}
