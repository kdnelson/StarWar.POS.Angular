import { SkipSelf } from '@angular/core';
import { NgModule, Optional } from '@angular/core';
import { EnsureModuleLoadedOnceGuard } from '../core/ensure-module-loaded-once-guard';

@NgModule({
  imports:      [],
  declarations: []
})
export class SharedModule extends EnsureModuleLoadedOnceGuard { 
    constructor(@Optional() @SkipSelf() parentModule: SharedModule) {
        super(parentModule);
      }
}