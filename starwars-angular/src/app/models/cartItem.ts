import { Guid } from 'guid-typescript';
import { MenuItemDetail } from './menuItemDetail';

export class CartItem {
  constructor(
    public id?: String,
    public name?: String,
    public quantity?: number,
    public price?: number,
    public menuItemOptionsCost?: number,
    public menuItemOptions?: MenuItemDetail[],
    public isSelected?: Boolean
  ) { }
}