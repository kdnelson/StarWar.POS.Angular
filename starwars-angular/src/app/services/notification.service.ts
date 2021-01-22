import { Injectable } from "@angular/core";
import { ErrorMsg } from "../models/errorMsg";
import { ErrorType } from "../models/errorType";
import { LogService } from "./log.service";

declare var $: any;

@Injectable()
export class NotificationService {
  private className: string = 'NotificationService';
  nextNotification: string = null;
  notifications: string[] = [];

  constructor(
    public errorType: ErrorType,
    public logService: LogService
  ) { }


  closeNotification() {
    let methodName: string = 'closeNotification';

    try {
      this.nextNotification = null;
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
  }

  getNextNotification() : string {
    let methodName: string = 'getNextNotification'; 
    let notification: string = null;
    
    try {
      let notifyQueue = this.notifications;
      if(notifyQueue.length > 0){
        notification = this.notifications.shift();
      }
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
    return notification;
  }

  notificationQueue() : string[] {
    let methodName: string = 'notificationQueue';

    try {
      this.notifications.push('Created by: Kris Nelson.');
      this.notifications.push('Contact: kris.d.nelson@gmail.com.');
    } catch (errMsg) {
      let errorMsg = new ErrorMsg(this.className, methodName, this.errorType.parseException, errMsg);
      this.logService.logHandler(errorMsg);
    }
    return this.notifications;
  }
}