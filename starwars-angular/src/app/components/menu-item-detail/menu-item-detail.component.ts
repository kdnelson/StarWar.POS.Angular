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

  loadModal() {
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

          let menuItemDetail: MenuItemDetail = this.createMenuItemDetail(menuItemOptions);
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

  private createMenuItemDetail(menuItemOptions: MenuItemOption[]) : MenuItemDetail {
    let methodName: string = 'createMenuItemDetail';
  
    let menuItemDetail: MenuItemDetail = null;

    try {
      if(menuItemOptions !== null) {
        menuItemDetail = new MenuItemDetail();
        menuItemDetail.id = Guid.create();
        menuItemDetail.name = "Firespray-31"
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
      new MenuItemOption(Guid.create(), "AM/FM Radio", false),
      new MenuItemOption(Guid.create(), "STA Missile System", false),
      new MenuItemOption(Guid.create(), "ATA Missile System", false),
      new MenuItemOption(Guid.create(), "N3 Guidence System", false),
      new MenuItemOption(Guid.create(), "Cup holder", false)
    ];
  }
}
