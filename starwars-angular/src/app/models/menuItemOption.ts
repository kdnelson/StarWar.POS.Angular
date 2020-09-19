import { Guid } from 'guid-typescript';

export class MenuItemOption {
  constructor(
    public id?: Guid,
    public name?: string,
    public isSelected?: boolean
  ) { }
}