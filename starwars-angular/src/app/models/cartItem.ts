export class CartItem {
  constructor(
    public id?: String,
    public name?: String,
    public quantity?: number,
    public price?: number,
    public menuItemOptionsCost?: number,
    public menuItemOptionsCount?: String,
    public isSelected?: Boolean
  ) { }
}