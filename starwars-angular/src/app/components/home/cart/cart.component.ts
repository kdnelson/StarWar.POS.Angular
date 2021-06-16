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

  submitCart(cart: Cart) {
    let methodName: string = 'submitCart';

    try {
      this.closeAllModals();
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  openMenuItemDetailModal() {
    let methodName: string = 'openMenuItemDetailModal';

    try {
      this.closeAllModals();
      this.menuItemDetailComponent.loadModal(true);
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
        cart.id = Guid.create();
        cart.itemsCounter = this.cartItemService.getCartCount();
        cart.cartItems = cartItems;
        cart.createdDate = new Date();
        cart.name = 'Cart_' + cart.id.toString().split('-')[0];
        cart.subTotal = 0;
        cart.tax = 0;
        cart.total = 0;
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

    let isSelectedAtIndex: number = -1;

    try {
      if(CartItem !== null && cart !== null) {
        if(cart.cartItems !== null) {
          cart.cartItems.forEach((item, index) => {

            if(item.id === cartItem.id){
              item.isSelected = true;
            } else {
              item.isSelected = false;
            }

            // if(item.isSelected)
            // {
            //   isSelectedAtIndex = index;
            // }
          });
      
          // if(isSelectedAtIndex == -1)
          // {
          //   let updateAtIndex = this.searchCartItemIndex(cartItem, cart.cartItems);
          //   if(updateAtIndex > -1)
          //   {
          //     cartItem.isSelected = true;
          //     cart.cartItems.splice(updateAtIndex, 1, cartItem);
          //   }
          // } else {
          //   if(cartItem.isSelected == false)
          //   {
          //     cart.cartItems.forEach((item) => {
          //       item.isSelected = false;
          //     });
          //   }
          // }
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

  private searchCartItemIndex(cartItem: CartItem, cartItems: CartItem[]) : number {
    let methodName: string = 'searchCartItemIndex';

    let cartItemAtIndex: number = -1;
  
    try {
      if(cartItem !== null && cartItems !== null){
        cartItems.forEach((item, index) => {
          if(item.id === cartItem.id)
          {
            cartItemAtIndex = index;
          }
        });
    
        return cartItemAtIndex;
      } else {
        let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, this.errorType.nullMethodParam);
        this.logService.logHandler(errorMsg);
      }
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }
}