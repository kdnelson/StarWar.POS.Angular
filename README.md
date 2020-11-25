***** Knowledge *****

+ links
https://www.interviewbit.com/angular-interview-questions/
https://github.com/DanWahlin/Angular-JumpStart
https://github.com/DanWahlin/angular-architecture
https://github.com/DanWahlin/Angular-RESTfulService

+ Why Angular?  
  1. JQuery and JavaScript couldn't maintain state across views
  2. Angular provides routing, state management, rxjs library and http by default.
+ Major Angular blocks
  1. In short:
     a. angular.json -> main.ts -> app.module.ts ->  app.component.ts -> index.html
  2. In detail:
     a. angular.json     - The CLR builder looks for this config file and endpoints within for the application endpoint
     b. main.ts          - The angular.json build section points to the main.ts file which creates the browser enviroment.                
     c. app.module.ts    - The first Angular module is called and bootstrapped - AppModule.  It has declarations to all the components              
     d. app.component.ts - The AppComponent is bootstrapped by the Angular base module called NgModule.  It interacts with the webpage and serves data to it.
     e. index.html       - The AppComponent's directive selector is called.
+ Component properties and declaration
  1. Selector - used for accessing the component as a directive
  2. Template/TemplateURL - contains HTML of the component
  3. StylesURL - contains component-specific stylesheets
  4. Defined by the @Component decorator
+ Angular binding between the component(Model) and its view(HTML template) (one-way or two-way)
  1. Property binding "[...]"
  2. Event binding "(...)"
  3. String interpolation binding "{{ 2 + 2 }}"
+ Angular provides two types of compilation:
  1. JIT(Just-in-Time) compilation
     a. Faster deployment
  2. AOT(Ahead-of-Time) compilation
     a. More responsive UI since the application is completly compiled before runtime.
     b. All external HTML/CSS files are sent with the application, allowing for less AJAX requests.
     c. Errors in building phase can be handled by developers
     d. All HTML files are pulled into the JS files at compile time, adding security to the application.
+ Observables versus Promises
  Observables emit multiple objects over time
  Promises emit on object
  Observables are lazy, only called when subscribed to
  Promises are not lazy
  Observables can be cancelled by an unsubscribe call
  Promises can't be cancelled
  Observables have operators such as map, forEach, filter, reduce, retry, retryWhen etc.
+ Angular component lifecycle
  1. In short:
     a. constructor -> ngOnchanges -> ngOnInit -> ngDoCheck -> (ngAfterContentInit/ngAfterContentChecked/ngAfterViewInit/ngAfterViewChecked) -> ngOnDestroy
  2. In detail:
     a. constructor - Called during component instaniation
     b. ngOnchanges - Called on propertiy changes, holds pre/cur values
     c. ngOnInit    - Called once for component setup
     d. ngDoCheck   - Called for non-Angular events
     e. Hook Options
        a. ngAfterContentInit     - Called after the first ngDoCheck is called
        b. ngAfterContentChecked  - Called after each subsequent ngDoCheck is called
        c. ngAfterViewInit        - Called after compoent view is initialized
        d. ngAfterViewChecked     - Called when compoent's view is checked
     f. ngOnDestroy - Called just before a component is destroyed, used for service clean ups
+ Angular's 3 types of directives
  1. Components: 
     By the selector <my-component></my-component>
  2. Attribute Directives:
     Its a custom way to modify the HTML DOM.  
     a. Import 'Directive' and 'ElementRef' @angular/core. ie: import { Directive, ElementRef } from '@angular/core';
     b. Decorate a class with @Directive and create a property bound selector.  ie: @Directive({
                                                                                      selector: '[appHighlight]'
                                                                                    })
     c. Define the exported class and create an elementRef constructor.  ie: export class HighlightDirective {
                                                                                  constructor(el: ElementRef) {
                                                                                     el.nativeElement.style.backgroundColor = 'yellow';
                                                                                  }
                                                                              }
     d. Place this custom directive within the HTML like you would a component directove.  ie: "<appHighlight>Highlight me!/>"
  3. Structural Directives
     Prebuilt Angular directives such as *ngIf, *ngFor and *ngSwitch that mod the HTML DOM using the component's methods and attributes.
+ Bootstrap Flex description.  
  1. What is it basically? This... <div class="d-flex justify-content-start/between/center/end" />
  2. What is p-2? Its vertical padding
+ Angular Universal allows for applications to run server-side
  1. First time users can instantly see a view of the application. This benefits in providing better user experience.
  2. Many search engines expect pages in plain HTML, thus, Universal can make sure that your content is available on every search engine, which leads to better SEO.
  3. Any server-side rendered application loads faster since rendered pages are available to the browser sooner.
+ Angular component communication
  1. Parent to child using the @Input decorator
  2. Child to parent using the @ViewChild decorator
  3. Child to parent using the @Output decorator and EventEmitter
+ Angular dependancy injection is done using the @Injectable decorator
+ Versus differences
  Ng 7+
  Routing on Modules:
  { path: 'customers', loadChildren: () => import('./customers/customers.module').then(m => m.CustomersModule) },
  Ng < 7
  Routing on Modules:
  { path: 'customers', loadChildren: 'app/customers/customers.module#CustomersModule' },
  List more differences between Ng7/8 and Ng10 (Look at Jump-Start)

***** TODO *****

+ Fix category filter buttons.  They are shared with MenuItemDetail, so...
+ TrackBy?
+ Rewrite modals using better bootstrap card and scroll techniques
+ Clean out Home.html and .css
+ Add a home model and bring into form like managers
+ The menu Home/Managers switch is ify
+ Add error logging to managers component
+ Bring down the filter icon level with cart top, not the counter integers

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
ng serve --aot
ng build        // create deployment artifacts to the dist folder
ng build --aot  // create deployment artifacts to the dist folder
ng config schematics.@schematics/angular:component.styleext scss
Create component:
  ng g c manager-details --skip-import

***** Hints *****

Try to keep each menu item to a module for lazy loading and seperation of concerns
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

****** Architecture ******
