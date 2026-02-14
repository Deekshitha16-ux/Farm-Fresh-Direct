
export type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  unit: string;
  stock: number;
  farmer: string; // farm name
  farmerId: string; // farmer's user ID
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

export type UserProfile = {
  id: string;
  displayName: string;
  email: string;
  userType: 'farmer' | 'customer';
  createdAt: string;
  updatedAt?: string;
  // Farmer specific
  farmName?: string;
  farmDetails?: string;
};

export type CartItem = {
    product: Product;
    quantity: number;
}

export type OrderItem = {
    product: Product; // Denormalized product info at time of purchase
    quantity: number;
    pricePerUnit: number;
    subtotal: number;
    productId: string;
    farmerId: string;
}

export type Order = {
    id?: string;
    customerId: string;
    customerName: string;
    orderDate: string;
    totalAmount: number;
    status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
    shippingAddress: string;
    items: OrderItem[];
    farmerIds: string[]; // For querying by farmers
}
