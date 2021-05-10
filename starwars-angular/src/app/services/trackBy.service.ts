import { Injectable } from '@angular/core';
import { Manager } from '../models/manager';

/// TODO - What is this used for? ///

@Injectable()
export class TrackByService {

  customer(index: number, manager: Manager) {
    return manager.id;
  }
}