import { Guid } from 'guid-typescript';
import { MenuItemOption } from './menuItemOption';

export class MenuItemDetail {
  constructor(
    public id?: Guid,
    public name?: String,
    public menuItemOptions?: MenuItemOption[],
    public isShowPic?: boolean,
  ){}
}