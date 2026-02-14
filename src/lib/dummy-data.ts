import type { Review, BlogPost } from '@/lib/types';

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
