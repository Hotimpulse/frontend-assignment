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
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";

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

  if (isError) {
    toast.error("There has been an error fetching files!");
    throw new Error("There has been an error fetching files!");
  }

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
    refetch();
  };

  return (
    <div className={listingStyles.listings_wrapper}>
      <h2>Рекомендации для вас</h2>
      <div className={listingStyles.listing_container}>
        {listings.map((listing) => (
          <div className={listingStyles.listings} key={listing.id}>
            {(isLoading || isFetching) && (
              <Skeleton count={3} width={600} height={450} />
            )}
            <Card className={listingStyles.listing}>
              <Card.Img
                className={listingStyles.listing_img}
                variant="top"
                src={listing.imageUrl}
              />
              <Card.Body className={listingStyles.listing_body}>
                <Card.Title>{listing.name}</Card.Title>
                <Card.Text className={listingStyles.listing_desc}>
                  <p>Стоимость: {listing.price} руб.</p>
                  <p>Количество просмотров: {listing.views}</p>
                  <p>Количество лайков: {listing.likes}</p>
                </Card.Text>
              </Card.Body>
              <Button>Open</Button>
            </Card>
          </div>
        ))}
      </div>
      <div className={listingStyles.pagination}>
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
