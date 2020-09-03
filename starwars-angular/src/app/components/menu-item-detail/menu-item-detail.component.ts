import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'menu-item-detail-modal',
  templateUrl: './menu-item-detail.component.html',
  styleUrls: ['./menu-item-detail.component.css']
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

  loadModal() {
    let methodName: string = 'loadModal';

    try {
      this.ngxSmartModalService.getModal('menuItemDetail').open();
    } catch(errMsg){
      //  let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      //  this.errorMsgComponent.loadModal(errorMsg);
    }
  }
}
