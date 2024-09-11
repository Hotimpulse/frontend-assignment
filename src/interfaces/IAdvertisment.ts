export interface IAdvertisment {
    id: string;
    name: string;
    description?: string;
    price: number;
    createdAt: string;
    views: number;
    likes: number;
    imageUrl?: string;
  }