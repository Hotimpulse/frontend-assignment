import { useEffect, useState } from "react";
import { Advertisment } from "@src/interfaces/types";
import Card from "react-bootstrap/Card";
import listingStyles from "./allListings.module.scss";

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
    <div className={listingStyles.listings_container}>
      {listings.map((listing) => (
        <div key={listing.id}>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={listing.imageUrl} />
            <Card.Body>
              <Card.Title>{listing.name}</Card.Title>
              <h4>Цена: {listing.price}</h4>
              <h4>Описание: </h4>
              <Card.Text>{listing.description}</Card.Text>
            </Card.Body>
          </Card>
        </div>
      ))}
      <div>pagination</div>
    </div>
  );
}
