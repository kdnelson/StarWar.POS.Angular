import { Guid } from 'guid-typescript';
import { MenuItemOption } from './menuItemOption';

export class MenuItemDetail {
  constructor(
    public id?: String,
    public name?: String,
    public menuItemOptions?: MenuItemOption[],
    public cost?: String,
    public detailCost?: String,
    public isEdit?: boolean,
  ){}
}