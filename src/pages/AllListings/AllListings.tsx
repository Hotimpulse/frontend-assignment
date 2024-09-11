import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import listingStyles from "./allListings.module.scss";
import { IAdvertisment } from "@src/interfaces/IAdvertisment";
import { Button } from "react-bootstrap";

export default function AllListings() {
  const [listings, setListings] = useState<IAdvertisment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ads, setAds] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await fetch("http://localhost:8000/advertisements");
        if (!response.ok) {
          throw new Error("No listings available!");
        }
        const data: IAdvertisment[] = await response.json();
        setListings(data);
        return data;
      } catch (error) {
        console.error(error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className={listingStyles.listings_wrapper}>
      <div className={listingStyles.listing_container}>
        {listings.map((listing) => (
          <div className={listingStyles.listings} key={listing.id}>
            <Card className={listingStyles.listing}>
              <Card.Img
                className={listingStyles.listing_img}
                variant="top"
                src={listing.imageUrl}
              />
              <Card.Body className={listingStyles.listing_body}>
                <Card.Title>{listing.name}</Card.Title>
                <h4>Цена: {listing.price}</h4>
                <h4>Описание: </h4>
                <Card.Text className={listingStyles.listing_desc}>
                  {listing.description !== "" ? listing.description : "No desc"}
                </Card.Text>
              </Card.Body>
              <Button>Open</Button>
            </Card>
          </div>
        ))}
      </div>
      <div>pagination</div>
    </div>
  );
}
