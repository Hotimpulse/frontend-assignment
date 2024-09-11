import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import orderStyles from "./orders.module.scss";
import { IOrder, OrderItem } from "@src/interfaces/IOrder";

export default function Orders() {
  const [orders, setOrders] = useState<IOrder[]>([]);

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
        return data;
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className={orderStyles.orders_wrapper}>
      <div className={orderStyles.order_container}>
        {orders.map((order) => (
          <div className={orderStyles.orders} key={order.id}>
            <Card className={orderStyles.order_card_wrapper}>
              <Card.Body className={orderStyles.order_card_body}>
                <Card.Text className={orderStyles.order_card_desc}>
                  {order.items.map((item: OrderItem) => (
                    <div className={orderStyles.card_content}>
                      <picture>
                        <source srcSet={item.imageUrl} type="image/png" />
                        <img
                          className={orderStyles.img}
                          src={item.imageUrl}
                          alt={`picture of ${item.name}`}
                          loading="lazy"
                        />
                      </picture>
                      <div className={orderStyles.card_text}>
                        <p>
                          {item.name}: {item.count} шт.
                        </p>
                        <p>Цена: {item.price} руб.</p>
                        <p>Просмотры: {item.views}</p>
                        <p>Лайки: {item.likes}</p>
                      </div>
                    </div>
                  ))}
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}
