import { Guid } from 'guid-typescript';

export class CartItem {
  constructor(
    public id?: Guid,
    public name?: String,
    public quantity?: number,
    public adjustedPrice?: Number,
    public isSelected?: Boolean
  ) { }
}