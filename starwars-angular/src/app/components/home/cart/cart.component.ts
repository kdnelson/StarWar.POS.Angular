import { Component } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Cart } from 'src/app/models/cart';
import { Guid } from 'guid-typescript';
import { CartItem } from 'src/app/models/cartItem';
import { MenuItemDetailComponent } from '../menu-item-detail/menu-item-detail.component';
import { ErrorType } from 'src/app/models/errorType';
import { LogService } from 'src/app/services/log.service';
import { ErrorMsg } from 'src/app/models/errorMsg';
import { CartItemService } from 'src/app/services/cartItemService';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'cart-modal',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
  providers: [CartItemService, ErrorType, LogService]
})
export class CartComponent {
  className: string = "CartComponent";
  subs = new Subscription();
  cartItems$: CartItem[] | Observable<CartItem[]>;

  constructor(
    private cartItemService: CartItemService,
    public ngxSmartModalService: NgxSmartModalService,
    public menuItemDetailComponent: MenuItemDetailComponent,
    public errorType: ErrorType,
    public logService: LogService
  ) { }

  resetForm(): void {
    let methodName: string = 'resetForm';

    try {
    } catch(errMsg){
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  loadModal() {
    let methodName: string = 'loadModal';
    this.closeAllModals();

    try {    
      let cartItems: CartItem[];
      this.cartItemService.get().subscribe(ci => cartItems = ci);
      let cart: Cart = this.createCart(cartItems);
      if(cart != null){
        this.ngxSmartModalService.setModalData(cart, 'cart', true);
        this.ngxSmartModalService.getModal('cart').open();
      }
    } catch(errMsg){
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }
  
  refreshModal(selectedCartId: String, cart: Cart) {
    let methodName: string = 'refreshModal';

    try {    
      let cartItems: CartItem[];
      this.cartItemService.get().subscribe(ci => cartItems = ci);

      cartItems.forEach(cartItem => {
        if(cartItem.id == selectedCartId){
          cartItem.isSelected = true;
        }
      });

      let updateCart: Cart = this.updateCart(cartItems, cart);
      if(updateCart != null && updateCart.cartItems.length > 0){
        this.ngxSmartModalService.setModalData(updateCart, 'cart', true);
      } else {
        this.closeAllModals();
      }
    } catch(errMsg){
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  submitCart(cart: Cart) {
    let methodName: string = 'submitCart';

    try {
      this.closeAllModals();
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  private closeAllModals() : void {
    let methodName: string = 'closeAllModals';

    try {
      this.ngxSmartModalService.getModal('categoryFilter').close();
      this.ngxSmartModalService.getModal('menuItemDetail').close();
      this.ngxSmartModalService.getModal('cart').close(); 
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  private createCart(cartItems: CartItem[]) : Cart {
    let methodName: string = 'createCart';
  
    let cart: Cart = null;
    
    try {
      if(cartItems !== null) {
        cart = new Cart();
        cart.id = Guid.create().toString();
        cart.itemsCounter = this.cartItemService.getCartCount();
        cart.name = 'Cart_' + cart.id.toString().split('-')[0];
        cart.createdDate = new Date();
        cart.cartItems = cartItems;
        cart.subTotal = this.cartItemService.getCartSubtotal();
        cart.tax = this.cartItemService.getCartTax(cart.subTotal);
        cart.total = cart.subTotal + cart.tax;
        return cart;
      } else {
        let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullMethodParam, 'cartItems');
        this.logService.logHandler(errorMsg);
      }
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  private updateCart(cartItems: CartItem[], cart: Cart) : Cart {
    let methodName: string = 'updateCart';
    
    try {
      if(cart !== null) {
        cart.itemsCounter = this.cartItemService.getCartCount();
        cart.name = cart.name;
        cart.createdDate = cart.createdDate;
        cart.cartItems = cartItems;
        cart.subTotal = this.cartItemService.getCartSubtotal();
        cart.tax = this.cartItemService.getCartTax(cart.subTotal);
        cart.total = cart.subTotal + cart.tax;
        return cart;
      } else {
        let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullMethodParam, 'cartItems');
        this.logService.logHandler(errorMsg);
      }
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  selectedCartItem(cartItem: CartItem, cart: Cart) {
    let methodName: string = 'selectedCartItem';

    try {
      if(CartItem !== null && cart !== null) {
        if(cart.cartItems !== null) {
          cart.cartItems.forEach((item, index) => {
            if(item.id === cartItem.id){
              item.isSelected = true;
            } else {
              item.isSelected = false;
            }
          });
        } else {
          let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, this.errorType.nullMethodParam);
          this.logService.logHandler(errorMsg);
        }
      } else {
        let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, this.errorType.nullMethodParam);
        this.logService.logHandler(errorMsg);
      }
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  cancelCartItem(cartItem: CartItem, cart: Cart) {
    let methodName: string = 'cancelCartItem';
    
    try {
      if(cartItem !== null && cart !== null) {
        if(cart.cartItems !== null) {
          cart.cartItems.forEach((item) => {
            if(item.id === cartItem.id){
              item.isSelected = false;
            }
          });
        } else {
          let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, this.errorType.nullMethodParam);
          this.logService.logHandler(errorMsg);
        }
      } else {
        let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, this.errorType.nullMethodParam);
        this.logService.logHandler(errorMsg);
      }
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  removeCartItem(cartItem: CartItem, cart: Cart) {
    let methodName: string = 'removeCartItem';
    
    try {
      if(cartItem !== null && cart !== null) {
        if(cart.cartItems !== null) {
          cart.cartItems.forEach((cItem) => {
            if(cartItem.id === cItem.id){
              cItem.isSelected = false;
              this.cartItemService.decrementCartItemCount(cItem);
              this.refreshModal(cItem.id, cart);
            }
          });
        } else {
          let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, this.errorType.nullMethodParam);
          this.logService.logHandler(errorMsg);
        }
      } else {
        let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, this.errorType.nullMethodParam);
        this.logService.logHandler(errorMsg);
      }
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  editCartItem(cartItem: CartItem, cart: Cart) {
    let methodName: string = 'editCartItem';

    try {
      this.closeAllModals();
      console.log('CartComponent.EditCartItem')
      // TODO convert cartItem to menuItemDetail
      //this.menuItemDetailComponent.loadModal(menuItemDetail, true);
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }
}