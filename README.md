***** Knowledge *****

https://www.interviewbit.com/angular-interview-questions/

Angular component lifecycle
AOC
Bootstrap Flex description.  Like what is p-2?

***** TODO *****

Adjust MIDetail XS left margin
Add MIDetail > XS Adjusted price
Btn text needs bomping down by 2px or so
Make the selected/non-selected buttons in MIDetail common
Add drop-down notify flyer

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

