import { Request } from "express";

export type RequestWithUserId = Request & {
  userId: string;
};

export type User = {
  id: string;
  email: string;
  name: string;
  password?: string;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
};

export type Cart = {
  id: string;
  userId: number;
  products: Product[];
};

export type TotalCart = {
  id: string;
  userId: number;
  products: Product[];
  totalPrice: number;
};

export type ProductCsv = {
  id?: string;
  name: string;
  description: string;
  category: string;
  price: number;
};
