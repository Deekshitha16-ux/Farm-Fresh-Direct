export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  stock: number;
  farmer: string;
  category: string;
  rating: number;
  reviewCount: number;
  imageId: string;
  imageUrl?: string;
};

export type Review = {
  id: string;
  productId: string;
  name: string;
  avatarUrl: string;
  rating: number;
  comment: string;
  location: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  imageId: string;
  content: string;
  imageUrl?: string;
};

export type User = {
    id: string;
    name: string;
    email: string;
    role: 'farmer' | 'customer';
    farmDetails?: string;
};

export type CartItem = {
    product: Product;
    quantity: number;
}

export type OrderItem = {
    product: Product;
    quantity: number;
}

export type Order = {
    id: string;
    userId: string;
    date: string;
    total: number;
    status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
    items: OrderItem[];
}
