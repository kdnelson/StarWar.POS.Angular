import { Guid } from 'guid-typescript';
import { CartItem } from "./cartItem";

export class Cart {
  constructor(
    public id?: Guid,
    public name?: String,
    public itemsCounter?: number,
    public createdDate?: Date,
    public cartItems?: CartItem[],
    public subTotal?: number,
    public tax?: number,
    public total?: number
  ){}
}