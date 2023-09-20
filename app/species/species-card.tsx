"use client";

import { Button } from "@/components/ui/button";
import type { Database } from "@/lib/schema";
import Image from "next/image";
import { useState, type ChangeEvent } from "react"; // Import useState

type Species = Database["public"]["Tables"]["species"]["Row"];

export default function SpeciesCard(species: Species, onUpdate: (editedSpecies: Species) => void, onClose: () => void) {
  const [showDetails, setShowDetails] = useState(false); // State to control the detailed view
  const [showLearnMore, setShowLearnMore] = useState(true);
  const [showEdit, setShowEdit] = useState(false); // State to control the detailed view
  const [editedSpecies, setEditedSpecies] = useState<Species>({ ...species });

  const handleClick = () => {
    setShowEdit(true);
    setShowDetails(false);
    setShowLearnMore(false);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditedSpecies((prevSpecies) => ({
      ...prevSpecies,
      [name]: value,
    }));
  };

  const handleLearn = () => {
    setShowDetails(true);
    setShowLearnMore(false);
  };

  const handleClose = () => {
    setShowLearnMore(true);
    setShowDetails(false);
  };

  const handleUpdate = () => {
    setShowLearnMore(true);
    setShowEdit(false);

    // onUpdate(editedSpecies);
  };

  // const handleSubmit = () => {
  //   species.common_name = "details";
  // };

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
      {showDetails && (
        <div>
          <p>Common Name: {species.common_name}</p>
          <p>Scientific Name: {species.scientific_name}</p>
          <p>Total Population: {species.total_population}</p>
          <p>Kingdom: {species.kingdom}</p>
          <p>Description: {species.description}</p>
          <Button className="mt-3 w-full" onClick={handleClose}>
            Close Details
          </Button>
          <Button className="mt-3 w-full" onClick={handleClick}>
            Edit
          </Button>
        </div>
      )}

      {showLearnMore && (
        <Button className="mt-3 w-full" onClick={handleLearn}>
          Learn More
        </Button>
      )}

      {showEdit && (
        <>
          <form>
            <div className="flex flex-col">
              <label htmlFor="common_name">Common Name:</label>
              <input
                type="text"
                id="common_name"
                name="common_name"
                value={editedSpecies.common_name ?? ""}
                onChange={handleChange}
              />
              <label htmlFor="scientific_name">Scientific Name:</label>
              <input
                type="text"
                id="scientific_name"
                name="scientific_name"
                value={editedSpecies.scientific_name ?? ""}
                onChange={handleChange}
              />
              <label htmlFor="total_population">Total Population:</label>
              <input
                type="text"
                id="total_population"
                name="total_population"
                value={editedSpecies.total_population ?? ""}
                onChange={handleChange}
              />
              <label htmlFor="common_name">Common Name:</label>
              <input
                type="text"
                id="common_name"
                name="common_name"
                value={editedSpecies.common_name ?? ""}
                onChange={handleChange}
              />
              <label htmlFor="kingdom">Kingdom:</label>
              <input
                type="text"
                id="kingdom"
                name="kingdom"
                value={editedSpecies.kingdom ?? ""}
                onChange={handleChange}
              />
              <label htmlFor="description">Description:</label>
              <input
                type="text"
                id="description"
                name="description"
                value={editedSpecies.description ?? ""}
                onChange={handleChange}
              />
            </div>
            {/* Add more fields for other attributes like scientific_name, total_population, etc. */}
          </form>
          <div>
            <Button className="mt-3 w-full" onClick={handleUpdate}>
              Update
            </Button>
            <Button className="mt-3 w-full" onClick={onClose}>
              Cancel
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
