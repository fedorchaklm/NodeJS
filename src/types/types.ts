import { Request } from "express";

export interface RequestWithUserId extends Request {
  userId: string;
}

export interface User {
  id: string,
  email: string,
  name: string,
  password?: string
}

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
}

export interface Cart {
  id: string;
  userId: number;
  products: Product[];
}

export interface TotalCart {
  id: string;
  userId: number;
  products: Product[];
  totalPrice: number;
}

export type ProductCsv = {
  id?: string
  name: string;
  description: string;
  category: string;
  price: number;
}
