import { MenuItemOption } from './menuItemOption';

export class MenuItemDetail {
  constructor(
    public id?: String,
    public name?: String,
    public menuItemOptions?: MenuItemOption[],
    public cost?: String,
    public totalCost?: String,
    public isEdit?: boolean,
  ){}
}