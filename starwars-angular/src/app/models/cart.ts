import { Guid } from 'guid-typescript';
import { CartItem } from "./cartItem";

export class Cart {
  constructor(
    public cartId?: Guid,
    public cartItems?: CartItem[],
    public cartName?: string,
    public createdDate?: Date,
    public subTotal?: number,
    public tax?: number,
    public total?: number,
  ){}
}