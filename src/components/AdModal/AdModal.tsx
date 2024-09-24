import { IAdvertisment } from "@src/interfaces/IAdvertisment";
import { FormEvent, useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import adModalStyles from "./adModal.module.scss";
import { IAdModal } from "@src/interfaces/IAdModal";

export default function AdModal({ refetch }: IAdModal) {
  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [adData, setAdData] = useState({
    adName: "",
    adPrice: 0,
    adDescription: "",
    adImageUrl: "",
  });

  useEffect(() => {
    const isValid =
      adData.adName.trim() !== "" &&
      adData.adPrice > 0 &&
      adData.adDescription.trim() !== "" &&
      adData.adImageUrl.trim() !== "";
    setIsFormValid(isValid);
  }, [adData]);

  const handleCreateAd = (e: FormEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
    }

    setValidated(true);

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
        adImageUrl: "https://dummyjson.com/image/300x300/484283/ffffff?text=",
      });
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setAdData((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  return (
    <div className={adModalStyles.modal}>
      <Button onClick={handleShow}>Разместить объявление</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Создать новое объявление</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            noValidate
            validated={validated}
            onSubmit={(e) => handleCreateAd(e)}
            className={adModalStyles.modal_body}
          >
            <Form.Group controlId="adImageUrl">
              <Form.Label>Фото</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите URL фото"
                value={
                  (adData.adImageUrl = `https://dummyjson.com/image/300x300/484283/ffffff?text=`)
                }
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Впишите адрес фото!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="adName">
              <Form.Label>Название</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите название"
                value={adData.adName}
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Впишите название!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="adDescription">
              <Form.Label>Описание</Form.Label>
              <Form.Control
                type="text"
                placeholder="Введите описание"
                value={adData.adDescription}
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Впишите описание!
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="adPrice">
              <Form.Label>Стоимость</Form.Label>
              <Form.Control
                type="number"
                placeholder="Введите cтоимость"
                value={adData.adPrice}
                onChange={handleInputChange}
                required
              />
              <Form.Control.Feedback type="invalid">
                Впишите стоимость!
              </Form.Control.Feedback>
            </Form.Group>
            <Button
              type="submit"
              disabled={!isFormValid}
              className={adModalStyles.modal_btn}
            >
              Создать
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
