import { useEffect, useState } from "react";
import { Advertisment } from "@src/interfaces/types";

export default function AllListings() {
  const [listings, setListings] = useState<Advertisment[]>([]);
  console.log("🚀 ~ AllListings ~ listings:", listings);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("http://localhost:8000/advertisements");
        if (!response.ok) {
          throw new Error("No listings available!");
        }
        const data: Advertisment[] = await response.json();
        setListings(data);
        return data;
      } catch (error) {
        console.error(error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div>
      <ul>
        {listings.map((listing) => (
          <li key={listing.id}>
            <h3>{listing.name}</h3>
            <p>Описание: {listing.description}</p>
            <p>Цена: {listing.price}</p>
          </li>
        ))}
      </ul>
      <div>pagination</div>
    </div>
  );
}
