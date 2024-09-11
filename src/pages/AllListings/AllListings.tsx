import Card from "react-bootstrap/Card";
import listingStyles from "./allListings.module.scss";
import { IAdvertisment } from "@src/interfaces/IAdvertisment";
import { Button, Pagination } from "react-bootstrap";
import { AppDispatch, RootState } from "@src/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import {
  setAds,
  setCurrentPage,
} from "@src/store/AllListings/allListingsSlice";

export default function AllListings() {
  const dispatch = useDispatch<AppDispatch>();
  const { listings, currentPage, totalPages } = useSelector(
    (state: RootState) => state.ads
  );

  const fetchAds = async (page: number) => {
    try {
      const response = await fetch(
        `http://localhost:8000/advertisements?_page=${page}&_limit=10`
      );
      if (!response.ok) {
        throw new Error("No listings available!");
      }
      const data: IAdvertisment[] = await response.json();
      dispatch(setAds(data));
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  const { isError, isLoading, isFetching, refetch } = useQuery<
    IAdvertisment[],
    Error
  >({
    queryKey: ["ads", currentPage],
    queryFn: () => fetchAds(currentPage),
    retry: 1,
  });

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    refetch();
  };

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
      <div>
        <Pagination>
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
        </Pagination>
      </div>
    </div>
  );
}
