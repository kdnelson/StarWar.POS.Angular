import { Cart } from "./cart";
import { CategoryFilter } from "./categoryFilter";
import { Manufacturer } from "./manufacturer";
import { MenuItem } from "./menuItem";

export class StoreState {
  categoryFilter: CategoryFilter = null;
  menuItems: MenuItem[];
  menuItem: MenuItem;
   // cart: Cart = null;
}