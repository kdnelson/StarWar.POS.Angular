import { Component, OnInit } from '@angular/core';
import { Guid } from 'guid-typescript';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { MenuItemDetail } from 'src/app/models/menuItemDetail';
import { MenuItemOption } from 'src/app/models/menuItemOption';

@Component({
  selector: 'menu-item-detail-modal',
  templateUrl: './menu-item-detail.component.html',
  styleUrls: ['./menu-item-detail.component-XS.css',
              './menu-item-detail.component-common.css']
})
export class MenuItemDetailComponent implements OnInit {

  constructor(
    public ngxSmartModalService: NgxSmartModalService
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
      this.ngxSmartModalService.getModal('cart').close(); 
    } catch (errMsg) {
      //let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, errMsg);
      //this.errorMsgComponent.loadModal(errorMsg);
    }
  }

  loadModal(isEdit: boolean) {
    let methodName: string = 'loadModal';
    this.closeAllModals();

    try {
      let menuItemOptions: MenuItemOption[] = this.getMenuItemOptions();
      if(menuItemOptions !== null){
        if(menuItemOptions.length > 0)
        {
          menuItemOptions.forEach((item, index) => {
            item.isSelected = false;
          });

          let menuItemDetail: MenuItemDetail = this.createMenuItemDetail(isEdit, menuItemOptions);
          if(menuItemDetail != null){
            this.ngxSmartModalService.setModalData(menuItemDetail, 'menuItemDetail', true);
            this.ngxSmartModalService.getModal('menuItemDetail').open();
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

  toggleShowPic(menuItemDetail: MenuItemDetail) {
    let methodName: string = 'toggleShowPic';

    try {
      if(menuItemDetail !== null){
        menuItemDetail.isShowPic = !menuItemDetail.isShowPic;
      }
    } catch (errMsg) {
      //let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      //this.errorMsgComponent.loadModal(errorMsg);
    }
  }

  private createMenuItemDetail(isEdit: boolean, menuItemOptions: MenuItemOption[]) : MenuItemDetail {
    let methodName: string = 'createMenuItemDetail';
  
    let menuItemDetail: MenuItemDetail = null;

    try {
      if(menuItemOptions !== null) {
        menuItemDetail = new MenuItemDetail();
        menuItemDetail.id = Guid.create();
        menuItemDetail.name = "Firespray-31";
        menuItemDetail.isShowPic = true;
        menuItemDetail.isEdit = isEdit;
        menuItemDetail.menuItemOptions = menuItemOptions;
        return menuItemDetail;
      } else {
        //let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, this.errorType.nullMethodParam);
        //this.errorMsgComponent.loadModal(errorMsg);
      }
    } catch (errMsg) {
      //let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      //this.errorMsgComponent.loadModal(errorMsg);
    }
  }

  private getMenuItemOptions() : MenuItemOption[] {
    return [ 
      new MenuItemOption(Guid.create(), "Laser Cannon", false),
      new MenuItemOption(Guid.create(), "AM/FM Radio", false),
      new MenuItemOption(Guid.create(), "Radar System", false),
      new MenuItemOption(Guid.create(), "Heated Seats", false),
      new MenuItemOption(Guid.create(), "Missile System", false),
      new MenuItemOption(Guid.create(), "Cup holder", false),
      new MenuItemOption(Guid.create(), "Guidence System", false)  
    ];
  }

  selectedOption(menuItemOption: MenuItemOption, menuItemDetail: MenuItemDetail) {
    let methodName: string = 'selectedOption';

    try {
      if(menuItemOption !== null && menuItemDetail !== null) {
        if(menuItemDetail.menuItemOptions !== null) {
          let optionIndex: number = this.searchOptionIndex(menuItemOption.name, menuItemDetail.menuItemOptions)
          if(menuItemOption.isSelected){
            menuItemOption.isSelected = false;
            menuItemDetail.menuItemOptions.splice(optionIndex, 1, menuItemOption);
          } else {
            menuItemOption.isSelected = true;
            menuItemDetail.menuItemOptions.splice(optionIndex, 1, menuItemOption);
          }
        } else {
          //let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, 'categoryFilter.filterTags');
          //this.errorMsgComponent.loadModal(errorMsg);
        }
      } else {
        // errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, this.errorType.nullMethodParam);
        //this.errorMsgComponent.loadModal(errorMsg);
      }
    } catch (errMsg) {
      //let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      //this.errorMsgComponent.loadModal(errorMsg);
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
        //let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, this.errorType.nullMethodParam);
        //this.errorMsgComponent.loadModal(errorMsg);
      }
    } catch (errMsg) {
      //let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, errMsg);
      //this.errorMsgComponent.loadModal(errorMsg);
    }
    return optionAtIndex;
  }

  addMenuItemToCart(menuItemDetail: MenuItemDetail) {
    let methodName: string = 'addMenuItemToCart';

    try {
      if(menuItemDetail !== null){
        this.ngxSmartModalService.getModal('menuItemDetail').close();
      } else {
        //let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, errMsg);
        //this.errorMsgComponent.loadModal(errorMsg);
      }
    } catch (errMsg) {
      //let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, errMsg);
      //this.errorMsgComponent.loadModal(errorMsg);
    }
  }

  editMenuItemToCart(menuItemDetail: MenuItemDetail) {
    let methodName: string = 'editMenuItemToCart';

    try {
      if(menuItemDetail !== null){
        this.ngxSmartModalService.getModal('menuItemDetail').close();
      } else {
        //let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, errMsg);
        //this.errorMsgComponent.loadModal(errorMsg);
      }
    } catch (errMsg) {
      //let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, errMsg);
      //this.errorMsgComponent.loadModal(errorMsg);
    }
  }

  cancel() {
    let methodName: string = 'cancel';

    try {
        this.ngxSmartModalService.getModal('menuItemDetail').close();
    } catch (errMsg) {
      //let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.nullException, errMsg);
      //this.errorMsgComponent.loadModal(errorMsg);
    }
  }
}
