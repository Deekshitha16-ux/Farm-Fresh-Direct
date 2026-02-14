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
    slug: 'a-farmers-guide-to-seasonal-eating',
    title: 'A Farmer\'s Guide to Seasonal Eating',
    excerpt: 'Learn why eating with the seasons is not only better for your health but also for the environment. Discover what\'s fresh right now!',
    author: 'Green Valley Farms',
    date: '2024-05-15',
    imageId: 'blog-gardening',
    content: '<p>Eating seasonally is a simple yet powerful way to connect with nature and improve your well-being. It means enjoying fruits and vegetables at their peak, when they are most flavorful, nutritious, and abundant.</p><p>By choosing local, seasonal produce, you not only get the best taste but also support your local farmers and reduce your carbon footprint. Food that travels shorter distances is fresher and requires less energy for transportation and storage.</p><p>So next time you\'re at the market, look for what\'s in season. Your taste buds, your body, and the planet will thank you.</p>'
  },
  {
    id: '2',
    slug: '5-minute-summer-salad-recipes',
    title: '5-Minute Summer Salad Recipes',
    excerpt: 'Tired of boring salads? We share five quick, easy, and delicious salad recipes using the freshest summer produce from our farm.',
    author: 'Sunrise Organics',
    date: '2024-06-02',
    imageId: 'blog-recipes',
    content: '<p>Summer is the perfect time for light and refreshing salads. With an abundance of fresh produce, the possibilities are endless. Here are five simple recipes you can whip up in minutes.</p><p>1. **Strawberry Spinach Salad:** Combine fresh spinach, sliced strawberries, goat cheese, and toasted almonds. Drizzle with a balsamic vinaigrette.</p><p>2. **Tomato & Cucumber Salad:** Chop ripe tomatoes and crisp cucumbers. Toss with red onion, fresh dill, and a simple lemon-tahini dressing.</p><p>These salads are not only delicious but also packed with nutrients to keep you energized all summer long.</p>'
  },
];

export const DUMMY_USERS: User[] = [
  {
    id: 'u1',
    name: 'John Doe',
    email: 'farmer@example.com',
    role: 'farmer',
    farmName: 'Green Valley Farms',
    farmDetails: 'A family-owned farm specializing in organic fruits and vegetables for over 30 years.'
  },
  {
    id: 'u3',
    name: 'Jane Smith',
    email: 'farmer2@example.com',
    role: 'farmer',
    farmName: 'Sunrise Organics',
    farmDetails: 'We are passionate about sustainable agriculture and bringing you the freshest produce.'
  },
  {
    id: 'u5',
    name: 'Samuel Jones',
    email: 'farmer3@example.com',
    role: 'farmer',
    farmName: 'Oakwood Gardens',
    farmDetails: 'Small batch, high quality, naturally grown vegetables.'
  },
  {
    id: 'u2',
    name: 'Alice',
    email: 'customer@example.com',
    role: 'customer'
  },
  {
    id: 'u4',
    name: 'Bob',
    email: 'customer2@example.com',
    role: 'customer'
  }
];

export const DUMMY_ORDERS: Order[] = [
  {
    id: 'ord1',
    userId: 'u2', // Alice
    date: '2024-06-20',
    total: 20.95,
    status: 'Delivered',
    items: [
        { product: DUMMY_PRODUCTS[0], quantity: 2 }, // Apples from Green Valley Farms
        { product: DUMMY_PRODUCTS[1], quantity: 1 }, // Carrots from Sunrise Organics
        { product: DUMMY_PRODUCTS[2], quantity: 1 }  // Tomatoes from Green Valley Farms
    ]
  },
  {
    id: 'ord2',
    userId: 'u4', // Bob
    date: '2024-06-22',
    total: 13.96,
    status: 'Shipped',
    items: [
        { product: DUMMY_PRODUCTS[3], quantity: 2 }, // Lettuce from Oakwood Gardens
        { product: DUMMY_PRODUCTS[5], quantity: 10 } // Potatoes from Oakwood Gardens
    ]
  },
  {
    id: 'ord3',
    userId: 'u2', // Alice
    date: '2024-06-23',
    total: 5.99,
    status: 'Pending',
    items: [
        { product: DUMMY_PRODUCTS[4], quantity: 1 } // Strawberries from Sunrise Organics
    ]
  }
];
