import { FilterOption } from "./filterOptions";

export class Filter {
    constructor(
      public name?: string,
      public isSelected?: boolean,
      public filterOption?: FilterOption
    ) { }
  }