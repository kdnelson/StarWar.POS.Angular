***** Knowledge *****

https://www.interviewbit.com/angular-interview-questions/
https://github.com/DanWahlin/Angular-JumpStart
https://github.com/DanWahlin/angular-architecture
https://github.com/DanWahlin/Angular-RESTfulService

Angular component lifecycle
3 types of directives
AOC
Bootstrap Flex description.  Like what is p-2?

Ng 7+
Routing on Modules:
{ path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) },
Ng < 7
Routing on Modules:
{ path: 'customers', loadChildren: 'app/customers/customers.module#CustomersModule' },

***** TIPS *****

Try to keep each feature to a module for lazy loading and seperation of concerns
Does the root module have to have everything?  
  Can routing, logging, api, etc also be placed into a module and inported to a feature module?

***** TODO *****

Move services and modals into these two modules, Core/Shared.
Fix filter buttons.  They are shred with MenuItemDetail, so...
I want the modal added out of home.

***** Commands *****
npm install npm@latest -g
ng add @angular/material
ng add @ng-bootstrap/ng-bootstrap
npm install -g @angular/cli
ng v
npm v
rm -r node_modules
npm i
ng serve -o
ng serve --port 0
ng config schematics.@schematics/angular:component.styleext scss
ng build //create deployment artifacts to the dist folder
Create three components:
  ng g c navigation
  ng g c first
  ng g c second

***** Hints *****
in PolyFils.ts
change:
import 'core-js/es7/reflect';
to:
import 'core-js/es/reflect';
Create a project that is SSASS enabled
ng new sassy-project --style=scss

ng-template

<mat-toolbar color="primary">
  <button
    type="button"
    aria-label="Toggle sidenav"
    mat-icon-button
    (click)="drawer.toggle()"
    *ngIf="true">
    <mat-icon aria-label="Side nav toggle icon" *ngIf="!drawer.opened; else showCross">
      menu
    </mat-icon>
    <ng-template #showCross>
      <mat-icon aria-label="Side nav toggle icon">close</mat-icon>
    </ng-template>
  </button>
  <span>web-doctor</span>
</mat-toolbar>

***** Issues *****

From XS, M, L to XL the nav bar can be off in showing Home or Manager
Shut-off modals for div-S

