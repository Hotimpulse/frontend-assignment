import { useState } from "react";
import Card from "react-bootstrap/Card";
import listingStyles from "./allListings.module.scss";
import { IAdvertisment } from "@src/interfaces/IAdvertisment";
import { Button, FormSelect, Pagination } from "react-bootstrap";
import { AppDispatch, RootState } from "@src/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  setAds,
  setCurrentPage,
} from "@src/store/AllListings/allListingsSlice";
import toast from "react-hot-toast";
import SearchPanel from "@src/components/SearchPanel/SearchPanel";
import AdModal from "@src/components/AdModal/AdModal";
import { useNavigate } from "react-router-dom";

export default function AllListings() {
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();
  const { listings, currentPage, totalPages } = useSelector(
    (state: RootState) => state.ads
  );
  const [limit, setLimit] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const navigate = useNavigate();

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    queryClient.invalidateQueries({ queryKey: ["ads"] });
  };

  const fetchAds = async (page: number, limit: number) => {
    try {
      const response = await fetch(
        `http://localhost:8000/advertisements?_page=${page}&_limit=${limit}`
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

  const { isError, refetch } = useQuery<IAdvertisment[], Error>({
    queryKey: ["ads", currentPage, limit],
    queryFn: () => fetchAds(currentPage, limit),
    retry: 1,
  });

  if (isError) {
    toast.error("There has been an error fetching files!");
    throw new Error("There has been an error fetching files!");
  }

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  const filteredListings = listings.filter((listing) =>
    listing.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handleOpenAd(id: string): void {
    navigate(`/listing/${id}`);
  }

  return (
    <div className={listingStyles.listings_wrapper}>
      <div className={listingStyles.listings_search_add_bar}>
        <AdModal refetch={refetch} />
        <SearchPanel setSearchQuery={setSearchQuery} />
      </div>
      <div className={listingStyles.recommendations}>
        <div className={listingStyles.recommendations_top}>
          <h2>Рекомендации для вас</h2>
          <FormSelect
            onChange={handleLimitChange}
            value={limit}
            className={listingStyles.recommendations_top_select}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </FormSelect>
        </div>
        <div className={listingStyles.listing_container}>
          {filteredListings.length > 0 ? (
            filteredListings.map((listing) => (
              <div className={listingStyles.listings} key={listing.id}>
                <Card className={listingStyles.listing}>
                  <Card.Img
                    className={listingStyles.listing_img}
                    variant="top"
                    src={listing.imageUrl}
                  />
                  <Card.Body className={listingStyles.listing_body}>
                    <Card.Title>{listing.name}</Card.Title>
                    <Card.Text className={listingStyles.listing_desc}>
                      Стоимость: {listing.price} руб.
                    </Card.Text>
                    <Card.Text className={listingStyles.listing_desc}>
                      Количество просмотров: {listing.views}
                    </Card.Text>
                    <Card.Text className={listingStyles.listing_desc}>
                      Количество лайков: {listing.likes}
                    </Card.Text>
                  </Card.Body>
                  <Button onClick={() => handleOpenAd(listing.id)}>
                    Посмотреть
                  </Button>
                </Card>
              </div>
            ))
          ) : (
            <p>Объявление не найдено</p>
          )}
        </div>
      </div>
      <div className={listingStyles.pagination}>
        {listings.length !== 0 ? (
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
        ) : null}
      </div>
    </div>
  );
}
