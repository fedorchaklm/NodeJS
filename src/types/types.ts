import { Request } from "express";

export type User = {
  id: string;
  email: string;
  name: string;
  password: string;
  role: APP_ROLES;
};

export type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
};

export type Cart = {
  id: string;
  userId: string;
  products: Product[];
};

export type TotalCart = {
  id: string;
  userId: string;
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

export type UserRequest = Request & { userRole?: string };

export enum APP_ROLES {
  Admin = "ADMIN",
  Customer = "CUSTOMER",
}

export type Maybe<T> = T | undefined;