import { Guid } from 'guid-typescript';
import { CartItem } from "./cartItem";

export class Cart {
  constructor(
    public id?: Guid,
    public name?: String,
    public itemsCounter?: Number,
    public createdDate?: Date,
    public subTotal?: Number,
    public tax?: Number,
    public total?: Number,
    public cartItems?: CartItem[]
  ){}
}