import { MenuItemOption } from "./menuItemOption";

export class CartItem {
  constructor(
    public id?: String,
    public name?: String,
    public quantity?: number,
    public price?: number,
    public totalPrice?: number,
    public cartItemOptions?: MenuItemOption[],
    public cartItemOptionsCount?: number,
    public isSelected?: Boolean
  ) { }
}