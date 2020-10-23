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

Try to keep each menu item to a module for lazy loading and seperation of concerns

***** TODO *****

Fix filter buttons.  They are shred with MenuItemDetail, so...
TrackBy?
Rewrite grid using card view
Is the manager-grid working?
Rename manager-card/manager-grid to managers-card/managers-grid, it is in the managers directory
Clean up and make nice!

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
Create component:
  ng g c manager-details --skip-import

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

