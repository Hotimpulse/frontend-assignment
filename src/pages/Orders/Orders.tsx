import { useEffect, useState } from "react";
import { Order } from "@src/interfaces/types";
import Card from "react-bootstrap/Card";
import orderStyles from "./orders.module.scss";

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/orders?_start=0&_limit=10"
        );
        if (!response.ok) {
          throw new Error("No orders available!");
        }
        const data: Order[] = await response.json();
        setOrders(data);
        return data;
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className={orderStyles.listings_wrapper}>
      <div className={orderStyles.listing_container}>
        {orders.map((order) => (
          <div className={orderStyles.listings} key={order.id}>
            <Card className={orderStyles.listing}>
              <Card.Img className={orderStyles.listing_img} variant="top" />
              <Card.Body className={orderStyles.listing_body}>
                <Card.Title>{order.createdAt}</Card.Title>
                <h4>Цена: {order.deliveryWay}</h4>
                <h4>Описание: </h4>
                <Card.Text className={orderStyles.listing_desc}>
                  {order.items.map((item) => (
                    <p>{item.name}</p>
                  ))}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
      <div>pagination</div>
    </div>
  );
}
