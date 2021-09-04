import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { CartItem } from 'src/app/models/cartItem';
import { ErrorMsg } from 'src/app/models/errorMsg';
import { ErrorType } from 'src/app/models/errorType';
import { MenuItem } from 'src/app/models/menuItem';
import { MenuItemDetail } from 'src/app/models/menuItemDetail';
import { MenuItemOption } from 'src/app/models/menuItemOption';
import { CartItemService } from 'src/app/services/cartItemService';
import { MenuItemService } from 'src/app/services/menuItemService';
import { LogService } from '../../../services/log.service';

@Component({
  selector: 'menu-item-detail-modal',
  templateUrl: './menu-item-detail.component.html',
  styleUrls: ['./menu-item-detail.component.css'],
  providers: [CartItemService, ErrorType, LogService]
})
export class MenuItemDetailComponent implements OnInit {
  className: string = "MenuItemDetailComponent";

  constructor(
    public ngxSmartModalService: NgxSmartModalService,
    public menuItemService: MenuItemService,
    public cartItemService: CartItemService,
    public errorType: ErrorType,
    public logService: LogService
  ) { }

  ngOnInit(): void {
    let methodName: string = 'ngOnInit';

    try {
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  resetForm(): void {
    let methodName: string = 'resetForm';

    try {
    } catch(errMsg){
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  loadModal(menuItem: MenuItem, isEdit: boolean) {
    let methodName: string = 'loadModal';

    try {
      this.closeAllModals();
      let menuItemOptions: MenuItemOption[] = this.getMenuItemOptions();
      if(menuItemOptions !== null){
        if(menuItemOptions.length > 0)
        {
          menuItemOptions.forEach((item) => {
            item.isSelected = false;
          });

          let menuItemDetail: MenuItemDetail = this.createMenuItemDetail(menuItem, isEdit, menuItemOptions);
          if(menuItemDetail != null){
            this.ngxSmartModalService.setModalData(menuItemDetail, 'menuItemDetail', true);
            this.ngxSmartModalService.getModal('menuItemDetail').open();
          }
          else{
            let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, 'menuItemDetail');
            this.logService.logHandler(errorMsg);
          }
        }
      } else {
        let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, this.errorType.nullMethodParam);
        this.logService.logHandler(errorMsg);
      }
    } catch(errMsg){
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  addMenuItemForCart(meniItemDetail: MenuItemDetail) : void {
    let methodName: string = 'addMenuItemForCart';

    try {
      let newCartItem = this.createCartItemFromMenuItem(meniItemDetail);
      if(newCartItem !== null){
        this.cartItemService.add(newCartItem);
        this.closeAllModals();
      } else {
        let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, null);
        this.logService.logHandler(errorMsg);
      } 
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  selectedOption(menuItemOption: MenuItemOption, menuItemDetail: MenuItemDetail) {
    let methodName: string = 'selectedOption';

    try {
      if(menuItemOption !== null && menuItemDetail !== null) {
        if(menuItemDetail.menuItemOptions !== null) {
          let optionIndex: number = this.searchOptionIndex(menuItemOption.name, menuItemDetail.menuItemOptions)
          if(menuItemOption.isSelected){
            menuItemOption.isSelected = false;
          } else {
            menuItemOption.isSelected = true;
          }
          menuItemDetail.menuItemOptions.splice(optionIndex, 1, menuItemOption);
          menuItemDetail.totalCost = menuItemDetail.cost;
          menuItemDetail.totalCost = this.updateMenuItemOptionsCost(menuItemDetail).toString()
        } else {
          let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, 'menuItemOptions');
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

  cancel() {
    let methodName: string = 'cancel';

    try {
        this.ngxSmartModalService.getModal('menuItemDetail').close();
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  private createCartItemFromMenuItem(menuItemDetail: MenuItemDetail) : CartItem {
    let methodName: string = 'createCartItemFromMenuItem';
    let newCartItem = null;

    try {
      newCartItem = new CartItem();
      newCartItem.id = menuItemDetail.id;
      newCartItem.name = menuItemDetail.name;
      newCartItem.quantity = 1;
      newCartItem.menuItemOptionsCount = this.getMenuItemOptionsCount(menuItemDetail).toString();
      newCartItem.price = menuItemDetail.totalCost;
      newCartItem.isSelected = false;
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }

    return newCartItem;
  }

  private getMenuItemOptionsCount(menuItemDetail: MenuItemDetail) : number {
    let methodName: string = 'getMenuItemOptionsCount';
    let menuItemDetailOptionsCount: number = 0;

    try {
      menuItemDetail.menuItemOptions.forEach(miOption => {
        if(miOption.isSelected){
          menuItemDetailOptionsCount++;
        }
      });
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }

    return menuItemDetailOptionsCount;
  }

  private updateMenuItemOptionsCost(menuItemDetail: MenuItemDetail) : number {
    let methodName: string = 'updateMenuItemOptionsCost';
    let menuItemDetailOptionsCost: number = 0;

    try {
      menuItemDetail.menuItemOptions.forEach(miOption => {
        if(miOption.isSelected){
          menuItemDetailOptionsCost += parseInt(miOption.cost.toString())
        }
      });
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }

    return parseInt(menuItemDetail.cost.toString()) + menuItemDetailOptionsCost;
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

  private searchOptionIndex(option: string, menuItemOptions: MenuItemOption[]) : number {
    let methodName: string = 'searchOptionIndex';

    let optionAtIndex = -1;

    try {
      if(option !== null && menuItemOptions !== null) {
        menuItemOptions.forEach((item, index) => {
          if(item.name === option)
          {
            optionAtIndex = index;
          }
        });  
      } else {
        let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, this.errorType.nullMethodParam);
        this.logService.logHandler(errorMsg);
      }
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, errMsg);
      this.logService.logHandler(errorMsg);
    }
    return optionAtIndex;
  }

  private createMenuItemDetail(menuItem: MenuItem, isEdit: boolean, menuItemOptions: MenuItemOption[]) : MenuItemDetail {
    let methodName: string = 'createMenuItemDetail';
  
    let menuItemDetail: MenuItemDetail = null;

    try {
      if(menuItemOptions !== null) {
        menuItemDetail = new MenuItemDetail();
        menuItemDetail.id = menuItem.id;
        menuItemDetail.name = menuItem.name;
        menuItemDetail.cost = menuItem.cost;
        menuItemDetail.totalCost = menuItem.cost;
        menuItemDetail.isEdit = isEdit;
        menuItemDetail.menuItemOptions = menuItemOptions;
        return menuItemDetail;
      } else {
        let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, this.errorType.nullMethodParam);
        this.logService.logHandler(errorMsg);
      }
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  private getMenuItemOptions() : MenuItemOption[] {
    let methodName: string = 'getMenuItemOptions';
    let menuItemOptions : MenuItemOption[] = []

    try {   
      menuItemOptions.push(new MenuItemOption(Guid.create().toString(), "Laser Cannon", "4590", false));
      menuItemOptions.push(new MenuItemOption(Guid.create().toString(), "AM/FM Radio", "650", false));
      menuItemOptions.push(new MenuItemOption(Guid.create().toString(), "Radar System", "3600", false));
      menuItemOptions.push(new MenuItemOption(Guid.create().toString(), "Heated Seats", "325", false));
      menuItemOptions.push(new MenuItemOption(Guid.create().toString(), "Missile System", "4530", false));
      menuItemOptions.push(new MenuItemOption(Guid.create().toString(), "Cup holder", "35", false));
      menuItemOptions.push(new MenuItemOption(Guid.create().toString(), "Guidence System", "6700", false));
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }

    return menuItemOptions;
  }
}
