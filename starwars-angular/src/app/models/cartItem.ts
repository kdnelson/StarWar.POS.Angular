import { Guid } from 'guid-typescript';

export class CartItem {
  constructor(
    public id?: String,
    public name?: String,
    public quantity?: number,
    public price?: number,
    public isSelected?: Boolean
  ) { }
}