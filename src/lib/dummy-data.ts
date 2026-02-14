import type { Product, Review, BlogPost, User, Order } from '@/lib/types';

export const DUMMY_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Organic Apples',
    description: 'Crisp, sweet, and juicy organic apples, perfect for snacking or baking. Grown with no pesticides.',
    price: 2.99,
    unit: 'lb',
    stock: 100,
    farmer: 'Green Valley Farms',
    category: 'Fruits',
    rating: 4.8,
    reviewCount: 62,
    imageId: 'apples',
  },
  {
    id: '2',
    name: 'Heirloom Carrots',
    description: 'A colorful mix of heirloom carrots, featuring purple, yellow, and orange varieties. Sweet and earthy.',
    price: 3.49,
    unit: 'bunch',
    stock: 50,
    farmer: 'Sunrise Organics',
    category: 'Vegetables',
    rating: 4.9,
    reviewCount: 45,
    imageId: 'carrots',
  },
  {
    id: '3',
    name: 'Vine-Ripened Tomatoes',
    description: 'Plump and juicy tomatoes, ripened on the vine for maximum flavor. Ideal for salads, sauces, and sandwiches.',
    price: 4.99,
    unit: 'lb',
    stock: 75,
    farmer: 'Green Valley Farms',
    category: 'Vegetables',
    rating: 4.7,
    reviewCount: 88,
    imageId: 'tomatoes',
  },
  {
    id: '4',
    name: 'Green Leaf Lettuce',
    description: 'Fresh and tender green leaf lettuce with a mild flavor. Perfect base for any salad.',
    price: 1.99,
    unit: 'head',
    stock: 120,
    farmer: 'Oakwood Gardens',
    category: 'Vegetables',
    rating: 4.8,
    reviewCount: 51,
    imageId: 'lettuce',
  },
    {
    id: '5',
    name: 'Sweet Strawberries',
    description: 'Freshly picked, sweet, and juicy strawberries. A perfect summer treat.',
    price: 5.99,
    unit: 'pint',
    stock: 80,
    farmer: 'Sunrise Organics',
    category: 'Fruits',
    rating: 4.9,
    reviewCount: 112,
    imageId: 'strawberries',
    },
    {
    id: '6',
    name: 'Russet Potatoes',
    description: 'Versatile Russet potatoes, great for baking, mashing, or frying. Earthy and satisfying.',
    price: 0.99,
    unit: 'lb',
    stock: 200,
    farmer: 'Oakwood Gardens',
    category: 'Vegetables',
    rating: 4.6,
    reviewCount: 74,
    imageId: 'potatoes',
    },
];

export const DUMMY_REVIEWS: Review[] = [
  {
    id: 'r1',
    productId: '1',
    name: 'Jane Doe',
    avatarUrl: 'https://picsum.photos/seed/jane/40/40',
    rating: 5,
    comment: 'These are the best apples I have ever tasted! So fresh and crisp. I will definitely be ordering again.',
    location: 'San Francisco, CA',
  },
  {
    id: 'r2',
    productId: '2',
    name: 'John Smith',
    avatarUrl: 'https://picsum.photos/seed/john/40/40',
    rating: 5,
    comment: 'The carrots were beautiful and delicious. My kids loved the different colors. Fast delivery too!',
    location: 'Oakland, CA',
  },
  {
    id: 'r3',
    productId: '3',
    name: 'Emily Johnson',
    avatarUrl: 'https://picsum.photos/seed/emily/40/40',
    rating: 4,
    comment: 'Great tomatoes for my pasta sauce. A bit pricey, but the flavor is worth it. Much better than the supermarket.',
    location: 'New York, NY',
  },
];

export const DUMMY_BLOG_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'seasonal-eating-guide',
    title: 'A Farmer\'s Guide to Seasonal Eating',
    excerpt: 'Learn why eating with the seasons is not only better for your health but also for the environment. Discover what\'s fresh right now!',
    author: 'Green Valley Farms',
    date: '2024-05-15',
    imageId: 'blog-gardening',
    content: '<p>Content goes here...</p>'
  },
  {
    id: '2',
    slug: 'summer-salad-recipes',
    title: '5-Minute Summer Salad Recipes',
    excerpt: 'Tired of boring salads? We share five quick, easy, and delicious salad recipes using the freshest summer produce from our farm.',
    author: 'Sunrise Organics',
    date: '2024-06-02',
    imageId: 'blog-recipes',
    content: '<p>Content goes here...</p>'
  },
];

export const DUMMY_USERS: User[] = [
  {
    id: 'u1',
    name: 'John Doe',
    email: 'farmer@example.com',
    role: 'farmer',
    farmDetails: 'A family-owned farm specializing in organic fruits and vegetables for over 30 years.'
  },
  {
    id: 'u2',
    name: 'Alice',
    email: 'customer@example.com',
    role: 'customer'
  }
];

export const DUMMY_ORDERS: Order[] = [
  {
    id: 'ord1',
    userId: 'u2',
    date: '2024-06-20',
    total: 23.44,
    status: 'Delivered',
    items: [
        { product: DUMMY_PRODUCTS[0], quantity: 2 },
        { product: DUMMY_PRODUCTS[2], quantity: 3 }
    ]
  }
];
