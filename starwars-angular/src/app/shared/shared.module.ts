import { SkipSelf } from '@angular/core';
import { NgModule, Optional } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from "@angular/common";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EnsureModuleLoadedOnceGuard } from '../shared/ensure-module-loaded-once-guard';

@NgModule({
  imports:      [
    BrowserModule,
    CommonModule,
    NgbModule,
  ],
  declarations: [],
  providers: [],
})
export class SharedModule extends EnsureModuleLoadedOnceGuard { 
    constructor(@Optional() @SkipSelf() parentModule: SharedModule) {
        super(parentModule);
      }
}