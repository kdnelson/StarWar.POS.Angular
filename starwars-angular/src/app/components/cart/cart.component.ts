import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Cart } from 'src/app/models/cart';
import { Guid } from 'guid-typescript';
import { CartItem } from 'src/app/models/cartItem';
import { MenuItemDetailComponent } from '../menu-item-detail/menu-item-detail.component';

@Component({
  selector: 'cart-modal',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    public menuItemDetailComponent: MenuItemDetailComponent,
  ) { }

  ngOnInit(): void {
  }

  resetForm(): void {
    let methodName: string = 'resetForm';

    try {
    } catch(errMsg){
      //  let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      //  this.errorMsgComponent.loadModal(errorMsg);
    }
  }

  private closeAllModals() : void {
    let methodName: string = 'closeAllModals';

    try {
      this.ngxSmartModalService.getModal('categoryFilter').close();
      this.ngxSmartModalService.getModal('menuItemDetail').close();
      this.ngxSmartModalService.getModal('cart').close(); 
    } catch (errMsg) {
      //let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, errMsg);
      //this.errorMsgComponent.loadModal(errorMsg);
    }
  }

  loadModal() {
    let methodName: string = 'loadModal';
    this.closeAllModals();

    try {
      let cartItems: CartItem[] = this.getCartItems();
      if(cartItems !== null){
        if(cartItems.length > 0)
        {
          cartItems.forEach((item, index) => {
            item.isSelected = false;
          });

          let cart: Cart = this.createCart(cartItems);
          if(cart != null){
            this.ngxSmartModalService.setModalData(cart, 'cart', true);
            this.ngxSmartModalService.getModal('cart').open();
          }
        }
      } else {
        //let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, 'categoryFilterTags');
        //this.errorMsgComponent.loadModal(errorMsg);
      }
    } catch(errMsg){
      //  let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      //  this.errorMsgComponent.loadModal(errorMsg);
    }
  }

  private createCart(cartItems: CartItem[]) : Cart {
    let methodName: string = 'createCart';
  
    let cart: Cart = null;

    try {
      if(cartItems !== null) {
        cart = new Cart();
        cart.id = Guid.create();
        cart.cartItems = cartItems;
        cart.createdDate = new Date();
        cart.name = 'cart_' + cart.id.toString().split('-')[0];
        cart.subTotal = 0;
        cart.tax = 0;
        cart.total = 0;
        //cart = this.modifyTicketName(ticket);
        return cart;
      } else {
        //let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, this.errorType.nullMethodParam);
        //this.errorMsgComponent.loadModal(errorMsg);
      }
    } catch (errMsg) {
      //let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      //this.errorMsgComponent.loadModal(errorMsg);
    }
  }

  private getCartItems() : CartItem[] {
    return [
      new CartItem(Guid.create(), "Sand Crawer", 3, 1234.98, false),
      new CartItem(Guid.create(), "Tie Fighter", 2, 1234.98, true),
      new CartItem(Guid.create(), "X-wing", 5, 1234.98, false),
      new CartItem(Guid.create(), "A-Wing", 4, 1234.98, false),
      new CartItem(Guid.create(), "AT-AT", 7, 1234.98, false)
    ];
  }

  openMenuItemDetailModal() {
    let methodName: string = 'openMenuItemDetailModal';

    try {
      this.closeAllModals();
      this.menuItemDetailComponent.loadModal(true);
    } catch (errMsg) {
      // let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      // this.errorMsgComponent.loadModal(errorMsg);
    }
  }
}
