import { IAdvertisment } from "./IAdvertisment";
export type OrderItem = IAdvertisment & { count: number };

export interface IOrder {
  id: string;
  status: (typeof OrderStatus)[keyof typeof OrderStatus];
  createdAt: string;
  finishedAt?: string;
  items: Array<OrderItem>;
  deliveryWay: string;
  total: number;
}

export const OrderStatus = {
  Created: 0,
  Paid: 1,
  Transport: 2,
  DeliveredToThePoint: 3,
  Received: 4,
  Archived: 5,
  Refund: 6,
} as const;
