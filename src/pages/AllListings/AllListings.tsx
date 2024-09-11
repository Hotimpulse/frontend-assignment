import { FormEvent, useState } from "react";
import Card from "react-bootstrap/Card";
import listingStyles from "./allListings.module.scss";
import { IAdvertisment } from "@src/interfaces/IAdvertisment";
import { Button, Form, FormSelect, Modal, Pagination } from "react-bootstrap";
import { AppDispatch, RootState } from "@src/store/store";
import { useDispatch, useSelector } from "react-redux";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  setAds,
  setCurrentPage,
} from "@src/store/AllListings/allListingsSlice";
import toast from "react-hot-toast";
import Skeleton from "react-loading-skeleton";
import SearchPanel from "@src/components/SearchPanel/SearchPanel";

export default function AllListings() {
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();
  const { listings, currentPage, totalPages } = useSelector(
    (state: RootState) => state.ads
  );
  const [limit, setLimit] = useState<number>(10);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [adData, setAdData] = useState({
    adName: "",
    adPrice: 0,
    adDescription: "",
    adImageUrl: "",
  });

  const handleLimitChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLimit(Number(e.target.value));
    queryClient.invalidateQueries({ queryKey: ["ads"] });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAdData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
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

  const { isError, isLoading, isFetching, refetch } = useQuery<
    IAdvertisment[],
    Error
  >({
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

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleCreateAd = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newAd: IAdvertisment = {
      id: `${Date.now()}`,
      name: adData.adName,
      price: adData.adPrice,
      createdAt: `${Date.now()}`,
      description: adData.adDescription,
      views: 200,
      likes: 300,
      imageUrl: adData.adImageUrl,
    };
    fetch("http://localhost:8000/advertisements", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify(newAd),
    }).then(() => {
      refetch();
      handleClose();
      setAdData({
        adName: "",
        adPrice: 0,
        adDescription: "",
        adImageUrl: "",
      });
    });
  };

  return (
    <div className={listingStyles.listings_wrapper}>
      <div className="aside">
        <SearchPanel setSearchQuery={setSearchQuery} />
        <div>
          <Button onClick={handleShow}>Разместить объявление</Button>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Создать новое объявление</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form onSubmit={(e) => handleCreateAd(e)}>
                <Form.Group controlId="adImageUrl">
                  <Form.Label>Фото</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Введите URL фото"
                    value={adData.adImageUrl}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="adName">
                  <Form.Label>Название</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Введите название"
                    value={adData.adName}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="adDescription">
                  <Form.Label>Описание</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Введите описание"
                    value={adData.adDescription}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Form.Group controlId="adPrice">
                  <Form.Label>Стоимость</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="Введите цену"
                    value={adData.adPrice}
                    onChange={handleInputChange}
                  />
                </Form.Group>
                <Button type="submit">Создать</Button>
              </Form>
            </Modal.Body>
          </Modal>

          <FormSelect onChange={handleLimitChange} value={limit}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
          </FormSelect>
        </div>
      </div>
      <div>
        <h2>Рекомендации для вас</h2>
        <div className={listingStyles.listing_container}>
          {filteredListings.length > 0 ? (
            filteredListings.map((listing) => (
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
            ))
          ) : (
            <p>Объявление не найдено</p>
          )}
        </div>
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
