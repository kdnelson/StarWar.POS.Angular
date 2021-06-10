import { Component, OnInit } from '@angular/core';
import { ErrorType } from 'src/app/models/errorType';
import { ErrorMsg } from 'src/app/models/errorMsg';
import { LogService } from 'src/app/services/log.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { NotificationService } from 'src/app/services/notification.service';
import { CartComponent } from './cart/cart.component';
import { CategoryFilterComponent } from './category-filter/category-filter.component';
import { MenuItemDetailComponent } from './menu-item-detail/menu-item-detail.component';
import { MenuItem } from 'src/app/models/menuItem';
import { Manufacturer } from 'src/app/models/manufacturer';
import { MenuItemService } from 'src/app/services/menuItemService';
import { CategoryFilterService } from 'src/app/services/categoryFilterService';
import { Observable, Subscription } from 'rxjs';
import { CartItemService } from 'src/app/services/cartItemService';
import { CartItem } from 'src/app/models/cartItem';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [CartItemService, MenuItemService, CategoryFilterService, CategoryFilterComponent, MenuItemDetailComponent, 
              CartComponent, ErrorType, LogService, NotificationService, 
              NgxSmartModalService],
})
export class HomeComponent implements OnInit {
  className: string = "HomeComponent";
  copywriteInfo: string = null;
  nextNotification: string = null;
  notifications: string[] = [];
  manufacturers: Manufacturer[] = [];
  menuItemsPerSelectedManufacturer: MenuItem[] = [];
  selectedManufacturer: string = "Corellia Mining Corporation";
  menuItemsIsOne: boolean = false;
  menuItemsIsTwo: boolean = false;
  menuItemsIsGreaterThanTwo: boolean = false;
  subs = new Subscription();
  menuItems$: MenuItem[] | Observable<MenuItem[]>;
  cartItems$: CartItem[] | Observable<CartItem[]>;

  public constructor(
    private menuItemService: MenuItemService,
    private cartItemService: CartItemService,
    public ngxSmartModalService: NgxSmartModalService,
    public categoryFilterComponent: CategoryFilterComponent,
    public menuItemDetailComponent: MenuItemDetailComponent,
    public cartComponent: CartComponent,
    public errorType: ErrorType,
    public logService: LogService,
    public notificationService: NotificationService
  ) {}

  ngOnInit() {
    let methodName: string = 'ngOnInit';

    try {
      this.loadSubscribers();
      this.prettyPrintCopywriteInfo();
      this.notificationService.notificationQueue();
      this.subscribeToNotifyQueue();
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  loadSubscribers() {
    let methodName: string = 'loadSubscribers';

    try {
      this.subs.add(this.menuItemService.stateChanged.subscribe(state => {
        if (state) {
          this.menuItems$ = state.menuItems;
          this.loadManufacturersMenu();
        }
      }));
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  get getManufacturers(): Manufacturer[] {
    let methodName: string = 'getManufacturers';

    try {
      this.SetSelectedManufacturer(this.selectedManufacturer); 
      return this.manufacturers;
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  get getMenuItemsPerManufacturer() : MenuItem[] {
    let methodName: string = 'getMenuItemPerManufacturer';

    try {
      this.menuItems$.forEach(m => {
        if(m.manufacturer == this.selectedManufacturer) {
          if(this.isCategoryFilterSet()){
            this.categoryFilterComponent.filterCollection.forEach((f) => {

              if(f.isSelected){
                if(f.filterOption.costRange === m.costRange ||
                   f.filterOption.crewRange === m.crewRange) {
                   if(!this.isMenuItemLoaded(m.name)){
                     this.menuItemsPerSelectedManufacturer.push(m);
                   }
                }
              }
            });
          } else {
            this.menuItemsPerSelectedManufacturer.push(m);
          }
        }
      });
      
      this.setColumnView();
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
    return this.menuItemsPerSelectedManufacturer;
  }

  get getCartCounter() : number {
    let methodName: string = 'getCartCounter';

    try {
      return this.cartItemService.getCartCount();
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  isCategoryFilterSet() : boolean {
    let methodName: string = 'isCategoryFilterSet';

    try {
      let isFilterSet = false;
      this.categoryFilterComponent.filterCollection.forEach((o) => {
        if(o.isSelected){
          isFilterSet = true;
          return;
        }
      });
      return isFilterSet;
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  isMenuItemLoaded(menuItemName: string) : boolean {
    let methodName: string = 'isMenuItemLoaded';

    try {
      let isFount = false;
      this.menuItemsPerSelectedManufacturer.forEach((m) => {
        if(m.name == menuItemName){
          isFount = true;
        }
      });
      return isFount;
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  loadManufacturersMenu() {
    let methodName: string = 'loadManufacturersMenu';

    try {
      this.subs = this.menuItemService.get().subscribe(() => {
        this.menuItems$.forEach((element) => {
          if(this.isManufacturerUnique(element.manufacturer.toString())){
            var manufacturer = new Manufacturer(element.manufacturer.toString(), false);
            this.manufacturers.push(manufacturer);
          }
        })
      });
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  setColumnView() : void {
    let methodName: string = 'setColumnView';

    try { 
      this.menuItemsIsOne = this.menuItemsPerSelectedManufacturer.length == 1;
      this.menuItemsIsTwo = this.menuItemsPerSelectedManufacturer.length == 2;
      this.menuItemsIsGreaterThanTwo = this.menuItemsPerSelectedManufacturer.length > 2;
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  SetSelectedManufacturer(manufacturerName: string) {
    let methodName: string = 'SetSelectedManufacturer';

    try {
      this.menuItemsPerSelectedManufacturer = [];

      this.manufacturers?.forEach(m => {
        m.isSelected = false;
      });

      this.manufacturers?.forEach(m => {
        if(m.name == manufacturerName){
          m.isSelected = true;
          this.selectedManufacturer = manufacturerName;
        }
      });
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  buildManufacturerList(longManufacturer: string){
    let methodName: string = 'buildManufacturerList';

    try {
      if(this.isManufacturerUnique(longManufacturer)){
        var manufacturer = new Manufacturer(longManufacturer, false);
        this.manufacturers.push(manufacturer);
      }
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  isManufacturerUnique(manufacturer: string) : boolean {
    let methodName: string = 'isManufacturerUnique';
    let result: boolean = true;
    
    try {
      this.manufacturers?.forEach(m => {
        if(m.name == manufacturer){
          result = false;
        }
      });
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }

    return result;
  }

  openCategoryFilterModal() {
    let methodName: string = 'openCategoryFilterModal';

    try {
      this.closeAllModals();
      this.categoryFilterComponent.loadModal();
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg); 
      this.logService.logHandler(errorMsg);
    }
  }

  openMenuItemDetailModal() {
    let methodName: string = 'openMenuItemDetailModal';

    try {
      this.closeAllModals();
      this.menuItemDetailComponent.loadModal(false);
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  openCartModal() {
    let methodName: string = 'openCartModal';

    try {
      this.closeAllModals();
      if(this.cartItemService.getCartCount() > 0){
        this.cartComponent.loadModal();
      }
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  editMenuItemForCart(meniItem: MenuItem) : void {
    let methodName: string = 'editMenuItemForCart';

    try {
      let newCartItem = this.createCartItemFromMenuItem(meniItem);
      if(newCartItem !== null){
        this.cartItemService.add(newCartItem);
      } else {
        let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, null);
        this.logService.logHandler(errorMsg);
      } 
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  private createCartItemFromMenuItem(menuItem: MenuItem) : CartItem {
    let methodName: string = 'createCartItemFromMenuItem';
    let newCartItem = null;

    try {
      newCartItem = new CartItem();
      newCartItem.id = menuItem.id;
      newCartItem.name = menuItem.name;
      newCartItem.quantity = 1;
      newCartItem.adjustedPrice = menuItem.cost;
      newCartItem.isSelected = false;
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }

    return newCartItem;
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

  private prettyPrintCopywriteInfo() {
    let methodName: string = 'prettyPrintCopywriteInfo';

    try {
      var date = new Date().toString().split(' ')[3];
      this.copywriteInfo = 'Silverskippy (c) ' + date;
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  private subscribeToNotifyQueue() {
    let methodName: string = 'subscribeToNotifyQueue';

    try {    
        setInterval(() => {
          this.nextNotification = this.notificationService.getNextNotification();
          if(this.nextNotification !== null) {
            this.easeDownNotifyBanner();
            this.pauseNotifyQueue(6000);
          }
        }, 8000);
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  private async pauseNotifyQueue(ms: number) {
    let methodName: string = 'pauseNotifyQueue';

    try {
      await new Promise<void>(resolve => setTimeout(()=>resolve(), ms)).then(()=>this.controlNotifyBanner());
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  private controlNotifyBanner() {
    let methodName: string = 'controlNotifyBanner';

    try {
      this.easeUpNotifyBanner();
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  private easeDownNotifyBanner() {
    let methodName: string = 'easeDownNotifyBanner';

    try {
      setTimeout(function() {
        $('#flyover-notification-XS').removeClass('ease-up').addClass('ease-down');
        $('#flyover-notification-M').removeClass('ease-up').addClass('ease-down');
        $('#flyover-notification-L').removeClass('ease-up').addClass('ease-down');
        $('#flyover-notification-XL').removeClass('ease-up').addClass('ease-down');
      }, 2000);
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  private easeUpNotifyBanner() {
    let methodName: string = 'easeUpNotifyBanner';

    try {
      setTimeout(function() {
        $('#flyover-notification-XS').removeClass('ease-down').addClass('ease-up');
        $('#flyover-notification-M').removeClass('ease-down').addClass('ease-up');
        $('#flyover-notification-L').removeClass('ease-down').addClass('ease-up');
        $('#flyover-notification-XL').removeClass('ease-down').addClass('ease-up');
        this.nextNotification = null;
      }, 1000);
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  ngOnDestroy() {
    let methodName: string = 'ngOnDestroy';

    try {
      this.subs.unsubscribe();
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }
}
