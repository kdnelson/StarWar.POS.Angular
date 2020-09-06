import { Guid } from 'guid-typescript';

export class CartItem {
  constructor(
    public cartItemId?: Guid,
    public name?: string,
    //public menuItemDetailDto?: MenuItemDetailDto,
    public quantity?: number,
    public adjustedPrice?: number,
    public isSelected?: boolean
  ) { }
}