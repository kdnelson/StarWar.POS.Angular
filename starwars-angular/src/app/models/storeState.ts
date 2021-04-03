import { Cart } from "./cart";
import { CategoryFilter } from "./categoryFilter";
import { Manufacturer } from "./manufacturer";
import { MenuItem } from "./menuItem";

export class StoreState {
  // selectedManufacturer: string = "";
  // categoryFilter: CategoryFilter = null;
  // menuItemsPerSelectedManufacturer: Manufacturer[] = [];
  // menuItems: MenuItem[] = [];
  // cart: Cart = null;
  menuItems: MenuItem[];
  menuItem: MenuItem;
}