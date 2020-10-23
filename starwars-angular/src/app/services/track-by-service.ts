import { Injectable } from '@angular/core';
import { Manager } from '../models/manager';

@Injectable()
export class TrackByService {

  customer(index: number, manager: Manager) {
    return manager.id;
  }
}