import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import orderStyles from "./orders.module.scss";
import { IOrder, OrderItem, OrderStatus } from "@src/interfaces/IOrder";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Filter from "@src/components/Filter/Filter";
import { Button, Modal } from "react-bootstrap";

export default function Orders() {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [statusFilter, setStatusFilter] = useState<number | "">("");
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const [showModal, setShowModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<IOrder | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/orders?_start=0&_limit=10"
        );
        if (!response.ok) {
          throw new Error("No orders available!");
        }
        const data: IOrder[] = await response.json();
        setOrders(data);
      } catch (error) {
        console.error(error);
        toast.error("No orders available!");
      }
    };

    fetchOrders();
  }, []);

  // filtering by status
  const filteredOrders = statusFilter
    ? orders.filter((order) => order.status === statusFilter)
    : orders;

  // filtering by price
  const sortedOrders = [...filteredOrders].sort((a, b) =>
    sortOrder === "asc" ? a.total - b.total : b.total - a.total
  );

  const getStatusLabel = (status: number) => {
    const statusValues = Object.entries(OrderStatus);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const foundStatus = statusValues.find(([key, value]) => value === status);
    return foundStatus ? foundStatus[0] : "";
  };

  const handleShowProducts = (order: IOrder) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseProducts = () => setShowModal(false);

  function handleProductClick(id: string) {
    navigate(`/listing/${id}`);
  }

  return (
    <div className={orderStyles.orders_wrapper}>
      <div className={orderStyles.filter_wrapper}>
        <Filter
          onFilterChange={(status) => setStatusFilter(status)}
          onSortChange={(order) => setSortOrder(order)}
        />
      </div>
      <div className={orderStyles.order_container}>
        {sortedOrders.map((order) => (
          <div className={orderStyles.orders} key={order.id}>
            <Card className={orderStyles.order_card_wrapper}>
              <Card.Body className={orderStyles.order_card_body}>
                <div className={orderStyles.order_card_desc}>
                  <p>Номер заказа: {order.id}</p>
                  <p>Статус: {getStatusLabel(order.status)}</p>
                  <p>Стоимость: {order.total} руб.</p>
                  <p>Создан: {order.createdAt}</p>
                  <p>Кол-во: {order.items.length} шт.</p>
                  <Button onClick={() => handleShowProducts(order)}>
                    Показать заказы
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>

      {selectedOrder && (
        <Modal show={showModal} onHide={handleCloseProducts}>
          <Modal.Header closeButton>
            <Modal.Title>Товары в заказе {selectedOrder.id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {selectedOrder.items.map((item: OrderItem) => (
              <div key={item.id} className={orderStyles.cart_items_wrapper}>
                <img
                  src={item.imageUrl + `${item.name}`}
                  className={orderStyles.img}
                />
                <div className={orderStyles.cart_item_desc}>
                  <span>
                    {item.name} - {item.count} шт.
                  </span>
                  <Button
                    variant="secondary"
                    size="sm"
                    onClick={() => handleProductClick(item.id)}
                  >
                    Посмотреть товар
                  </Button>
                </div>
              </div>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseProducts}>
              Закрыть
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
}
