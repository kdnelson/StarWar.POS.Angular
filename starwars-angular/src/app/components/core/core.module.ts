import { SkipSelf } from '@angular/core';
import { NgModule, Optional } from '@angular/core';
import { EnsureModuleLoadedOnceGuard } from './ensure-module-loaded-once-guard';

@NgModule({
  imports:      [],
  declarations: []
})
export class CoreModule extends EnsureModuleLoadedOnceGuard { 
    constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
        super(parentModule);
      }
}