import { Cart } from "./cart";
import { Filter } from "./filter";
import { MenuItem } from "./menuItem";

export class StoreState {
  filter: Filter;
  filters: Filter[];
  menuItem: MenuItem;
  menuItems: MenuItem[];
   // cart: Cart = null;
}