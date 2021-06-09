import { CartItem } from "./cartItem";
import { Filter } from "./filter";
import { MenuItem } from "./menuItem";

export class StoreState {
  cartItem: CartItem;
  cartItems: CartItem[];
  filter: Filter;
  filters: Filter[];
  menuItem: MenuItem;
  menuItems: MenuItem[];
}