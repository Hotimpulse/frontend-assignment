import { useParams } from "react-router-dom";
import listingStyles from "./listing.module.scss";
import { AppDispatch, RootState } from "@src/store/store";
import { useDispatch, useSelector } from "react-redux";
import { fetchListingInfo, setListing } from "@src/store/Listing/listingSlice";
import { useEffect, useState, FormEvent } from "react";
import { Button, Form } from "react-bootstrap";

export default function Listing() {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { listing } = useSelector((store: RootState) => store.listing);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({
    imageUrl: listing.imageUrl || "",
    name: listing.name || "",
    price: listing.price || 0,
    description: listing.description || "",
  });

  useEffect(() => {
    if (id) {
      dispatch(fetchListingInfo(id));
    }
  }, [id, dispatch]);

  useEffect(() => {
    setEditData({
      imageUrl: listing.imageUrl || "",
      name: listing.name,
      price: listing.price,
      description: listing.description || "",
    });
  }, [listing]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setEditData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleSaveChanges = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    fetch(`http://localhost:8000/advertisements/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...listing,
        ...editData,
      }),
    })
      .then((response) => {
        if (!response.ok) throw new Error("Error updating ad");
        return response.json();
      })
      .then((updatedAd) => {
        dispatch(setListing(updatedAd));
        setIsEditing(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className={listingStyles.wrapper}>
      {isEditing ? (
        <Form
          onSubmit={handleSaveChanges}
          className={listingStyles.edit_wrapper}
        >
          <Form.Group controlId="imageUrl">
            <Form.Label>Фото</Form.Label>
            <Form.Control
              type="text"
              value={editData.imageUrl}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="name">
            <Form.Label>Название</Form.Label>
            <Form.Control
              type="text"
              value={editData.name}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="price">
            <Form.Label>Цена</Form.Label>
            <Form.Control
              type="number"
              value={editData.price}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Form.Group controlId="description">
            <Form.Label>Описание</Form.Label>
            <Form.Control
              as="textarea"
              value={editData.description}
              onChange={handleInputChange}
            />
          </Form.Group>
          <Button type="submit">Сохранить изменения</Button>
        </Form>
      ) : (
        <div className={listingStyles.card}>
          <div className={listingStyles.top_part}>
            <div className={listingStyles.heading}>
              <h1 className={listingStyles.wrapper}>{listing.name}</h1>
            </div>
            <div className={listingStyles.price}>{listing.price} руб.</div>
          </div>
          <div className={listingStyles.lower_part}>
            <img
              className={listingStyles.listing_img}
              src={`http://localhost:5173/` + listing.imageUrl}
              alt={`image of the ${listing.name}`}
            />
            <p className={listingStyles.description}>{listing.description}</p>
          </div>
          <Button onClick={handleEditToggle}>
            {isEditing ? "Отмена" : "Изменить"}
          </Button>
        </div>
      )}
    </div>
  );
}
