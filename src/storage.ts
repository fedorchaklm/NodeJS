import { Cart, Product, User } from "./types/types";

export const products: Array<Product> = [
  {
    id: '1',
    category: 'food',
    name: "Digital Painting",
    description: "A custom digital painting created by a professional artist.",
    price: 50,
  },
  {
    id: '2',
    category: 'food',
    name: "Online Yoga Class",
    description: "A one-hour online yoga session with a certified instructor.",
    price: 20,
  },
  {
    id: '3',
    category: 'food',
    name: "E-Book",
    description: "A bestselling e-book available for instant download.",
    price: 10,
  },
  {
    id: '4',
    category: 'food',
    name: "Virtual Cooking Class",
    description: "A two-hour virtual cooking class with a renowned chef.",
    price: 30,
  },
  {
    id: '5',
    category: 'food',
    name: "Music Streaming Subscription",
    description:
      "A three-month subscription to a premium music streaming service.",
    price: 15,
  },
  {
    id: '6',
    category: 'food',
    name: "Online Course",
    description: "Access to an online course on a subject of your choice.",
    price: 100,
  },
  {
    id: '7',
    category: 'food',
    name: "Digital Photo Album",
    description:
      "A beautifully crafted digital photo album with customizable options.",
    price: 25,
  },
  {
    id: '8',
    category: 'food',
    name: "Meditation App Subscription",
    description: "A one-year subscription to a popular meditation app.",
    price: 40,
  },
  {
    id: '9',
    category: 'food',
    name: "Virtual Tour",
    description: "A virtual tour of a famous museum or landmark.",
    price: 35,
  },
  {
    id: '10',
    category: 'food',
    name: "Online Personal Training Session",
    description:
      "A personalized one-hour workout session with a certified trainer.",
    price: 45,
  },
];

export const users: Array<User> = [];

export const carts: Array<Cart> = [];
