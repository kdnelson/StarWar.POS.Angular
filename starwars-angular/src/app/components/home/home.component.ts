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
import { Guid } from 'guid-typescript';
import { Manufacturer } from 'src/app/models/manufacturer';
import { SubjectService } from 'src/app/services/subjectService';
import { SubSink } from 'subsink';

declare var $: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [SubjectService, CategoryFilterComponent, MenuItemDetailComponent, 
              CartComponent, ErrorType, LogService, NotificationService, 
              NgxSmartModalService],
})
export class HomeComponent implements OnInit {
  className: string = "HomeComponent";
  copywriteInfo: string = null;
  nextNotification: string = null;
  notifications: string[] = [];
  manufacturers: Manufacturer[] = [];
  behaviorSubjectObservableMenuItems: MenuItem[] = [];
  menuItemsPerManufacturer: MenuItem[] = [];
  selectedManufacturer: string = "Corellia Mining Corporation";
  menuItemsIsOne: boolean = false;
  menuItemsIsTwo: boolean = false;
  menuItemsIsGreaterThanTwo: boolean = false;
  subsink = new SubSink();

  public constructor(
    private subjectService: SubjectService,
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
      this.subjectService.loadBehaviorSubjects();
      this.runAction();
      
      //this.getVehicles();
      //this.getStarShips();
      //console.log(this.httpClientService.allMenuItems);
      //this.httpClientService?.allMenuItems?.forEach(o => o.name)

      //console.log(this.httpClientService.allRawStarShips);
      //this.readRouteParams();
      this.prettyPrintCopywriteInfo();
      this.notificationService.notificationQueue();
      this.subscribeToNotifyQueue();
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  runAction() {
    let action = () => {
      this.subsink.sink = this.subjectService.behaviorSubjectObservable$.subscribe(o => {
        o.forEach((element) => {
          if(!this.isMenuItemAlreadyLoaded(element.name.toString())){
            this.behaviorSubjectObservableMenuItems.push(element)
          }
        });
      })
    };
    action();
  }

  isMenuItemAlreadyLoaded(menuItemName: string) : Boolean {
    let isFound = false;
    this.behaviorSubjectObservableMenuItems.forEach((o) => {
      if(o.name == menuItemName){
        isFound = true;
      }
    });
    return isFound;
  }


  // get getManufacturers(): Manufacturer[] {
  //   let methodName: string = 'getManufacturers';

  //   try {
  //     this.SetSelectedManufacturer(this.selectedManufacturer); 
  //     return this.manufacturers;
  //   } catch (errMsg) {
  //     let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
  //     this.logService.logHandler(errorMsg);
  //   }
  // }

  // getVehicles() {
  //   let methodName: string = 'getVehicles';

  //   try {
  //     this.httpClientService?.allRawVehicles?.forEach(element => {
  //       element.forEach(o => {
  //         console.log(o);
  //         //this.buildManufacturerList(o.manufacturer);
  //         //this.buildMenuItemList(this.createMenuItem(o));
  //       });
  //     });
  //   } catch (errMsg) {
  //     let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
  //     this.logService.logHandler(errorMsg);
  //   }
  // }

  // getStarShips() {
  //   let methodName: string = 'getStarShips';

  //   try {
  //     this.httpClientService?.allRawStarShips?.forEach(element => {
  //       element.forEach(o => {
  //         this.buildManufacturerList(o.manufacturer);
  //         this.buildMenuItemList(this.createMenuItem(o));
  //       });
  //     });
  //   } catch (errMsg) {
  //     let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
  //     this.logService.logHandler(errorMsg);
  //   }
  // }

  SetSelectedManufacturer(manufacturerName: string) {
    let methodName: string = 'SetSelectedManufacturer';

    try {
      this.manufacturers?.forEach(m => {
        m.isSelected = false;
      });

      this.manufacturers?.forEach(m => {
        if(m.name == manufacturerName){
          m.isSelected = true;
          this.selectedManufacturer = manufacturerName;
          this.menuItemsPerManufacturer = [];

          // this.manufacturers?.forEach(o => {
          //   console.log(o.name);
          // });

          console.log(this.selectedManufacturer);
          console.log(this.manufacturers.length);
          //console.log(this.menuItems.length);

          this.menuItemsIsOne = this.menuItemsPerManufacturer.length == 1;
          this.menuItemsIsTwo = this.menuItemsPerManufacturer.length == 2;
          this.menuItemsIsGreaterThanTwo = this.menuItemsPerManufacturer.length > 2;
        }
      });
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  get getMenuItemsPerManufacturer() : MenuItem[] {
    let methodName: string = 'getMenuItemPerManufacturer';

    try {
      return this.menuItemsPerManufacturer;
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

  createMenuItem(rawMenuItem: any) : MenuItem {
    let methodName: string = 'createMenuItem';
    var result: MenuItem = null;

    try {   
      result = new MenuItem(
        Guid.create().toString(),
        rawMenuItem.name, 
        rawMenuItem.manufacturer, 
        rawMenuItem.cost_in_credits, 
        rawMenuItem.length, 
        rawMenuItem.max_atmosphering_speed, 
        rawMenuItem.crew, 
        rawMenuItem.passengers, 
        rawMenuItem.cargo_capacity, 
        rawMenuItem.consumables
      );
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }

    return result;
  }

  buildMenuItemList(menuItem: MenuItem) : MenuItem {
    let methodName: string = 'buildMenuItemList';
    var result: MenuItem;

    try {
      //this.menuItems.push(menuItem);
      return null;
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }

    return result;
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

  get getTicketCounter() : number {
    let methodName: string = 'getTicketCounter';

    try {
      return 333;
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
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
      this.cartComponent.loadModal();
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
    this.subsink.unsubscribe();
  }
}

enum ActionType {
  subject,
  behaviorSubject,
  replaySubject,
  asyncSubject
}
