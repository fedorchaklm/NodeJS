import { Request } from "express";

export type User = {
  id: string;
  email: string;
  name: string;
  password: string;
  role: APP_ROLES;
};

export type Product = {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
};

export type Cart = {
  id: string;
  userId: string;
  products: Array<Product>;
};

export type TotalCart = {
  id: string;
  userId: string;
  products: Array<Product>;
  totalPrice: number;
};

export type UserRequest = Request & { userRole?: string };

export enum APP_ROLES {
  Admin = "ADMIN",
  Customer = "CUSTOMER",
}

export type Maybe<T> = T | undefined;