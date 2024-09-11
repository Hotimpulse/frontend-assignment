import { IAdvertisment } from "@src/interfaces/IAdvertisment";
import { FormEvent, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import adModalStyles from "./adModal.module.scss";
import { IAdModal } from "@src/interfaces/IAdModal";

export default function AdModal({ refetch }: IAdModal) {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);
  const [adData, setAdData] = useState({
    adName: "",
    adPrice: 0,
    adDescription: "",
    adImageUrl: "",
  });

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
            onSubmit={(e) => handleCreateAd(e)}
            className={adModalStyles.modal_body}
          >
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
            <Button type="submit" disabled={adData.adPrice < 0} className={adModalStyles.modal_btn}>
              Создать
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}
