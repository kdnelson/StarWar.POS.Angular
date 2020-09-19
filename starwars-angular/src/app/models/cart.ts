import { Guid } from 'guid-typescript';
import { CartItem } from "./cartItem";

export class Cart {
  constructor(
    public id?: Guid,
    public cartItems?: CartItem[],
    public name?: string,
    public createdDate?: Date,
    public subTotal?: number,
    public tax?: number,
    public total?: number,
  ){}
}