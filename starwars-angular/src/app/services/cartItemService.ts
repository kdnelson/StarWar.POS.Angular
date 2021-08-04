import { Injectable } from "@angular/core";
import { ObservableStore } from "@codewithdan/observable-store";
import { exit } from "process";
import { of } from "rxjs";
import { CartItem } from "../models/cartItem";
import { ErrorMsg } from "../models/errorMsg";
import { ErrorType } from "../models/errorType";
import { StoreActions } from "../models/storeActions";
import { StoreState } from "../models/storeState";
import { LogService } from "./log.service";

@Injectable({
  providedIn: 'root'
})
export class CartItemService extends ObservableStore<StoreState> {
  className: string = "CartItemService";

  constructor(
    public errorType: ErrorType,
    public logService: LogService
    ) {
      super({ 
          trackStateHistory: true, 
          logStateChanges: true 
      });
      this.init();
  }
 
  init() {
    let methodName: string = 'init';
 
    try {    
     
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }
 
  get() {
    let methodName: string = 'get';
 
    try {    
      const cartItems = this.getState().cartItems;
      return of(cartItems);
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }
  
  add(cartItem: CartItem) {
    let methodName: string = 'add';
 
    try {          
      let state = this.getState();
      if(!this.isCartItemInCart(cartItem, state)){
        cartItem = this.modCartItemName(cartItem);
        state.cartItems.push(cartItem);
        this.setState({ cartItems: state.cartItems }, StoreActions.AddCartItem);
      }    
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    } finally {
      console.log('State History:', this.stateHistory);
    }
  }

  remove(cartItemIndex: number) {
    let methodName: string = 'remove';

    try {              
      let state = this.getState();
      state.cartItems.splice(cartItemIndex, 1);
      this.setState({ cartItems: state.cartItems }, StoreActions.RemoveCartItem);
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    } finally {
      console.log('State History:', this.stateHistory);
    }
  }
 
  decrementCartItemCount(cartItem: CartItem) {
    let methodName: string = 'decrementCartItemCount';
    let cartItemIndex = 0;
 
    try {
      let state = this.getState();
      state.cartItems.forEach((cItem) => {
        if(cartItem.id === cItem.id){
          if(cItem.quantity == 1){
            this.remove(cartItemIndex);
          } else {
            cItem.quantity = cItem.quantity - 1;
            this.setState({ cartItems: state.cartItems }, StoreActions.UpdateCartItem); 
          }
        }
        cartItemIndex++;
      })
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    } finally {
      console.log('State History:', this.stateHistory);
    }
  }

  getCartCount() : number {
    let methodName: string = 'getCartCount';
    let cartCounter = 0;

    try {    
        let state = this.getState();
        state.cartItems.forEach((cartItem) => {
            cartCounter = cartCounter + cartItem.quantity;
        })
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }

    return cartCounter;
  }

  private isCartItemInCart(cartItem: CartItem, state: StoreState) : boolean {
    let methodName: string = 'isCartItemInCart';
    let isFound = false;

    try {    
        state.cartItems.forEach((cItem) => {
          if(cartItem.id === cItem.id){
            cItem.quantity = cItem.quantity + 1;
            isFound = true;
            this.setState({ cartItems: state.cartItems }, StoreActions.UpdateCartItem); 
          }
        })
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
    return isFound;
  }

  private modCartItemName(cartItem: CartItem) : CartItem {
    let methodName: string = 'modCartItemName';

    try {    
      if (cartItem.name.length > 23) {
        cartItem.name = cartItem.name.substring(0, 22) + "...";
      }
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }

    return cartItem;
  }
}