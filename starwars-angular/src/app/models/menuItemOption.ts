import { Guid } from 'guid-typescript';

export class MenuItemOption {
  constructor(
    public id?: String,
    public name?: string,
    public isSelected?: boolean
  ) { }
}