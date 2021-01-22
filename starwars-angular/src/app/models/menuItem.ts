import { Guid } from 'guid-typescript';

export class MenuItem {
  constructor(
    public id?: Guid,
    public name?: String,
    public manufacturer?: String,
    public cost?: String,
    public length?: String,
    public speed?: String,
    public crew?: String,
    public passengers?: String,
    public cargoCapacity?: String,
    public consumables?: String,
  ){}
}