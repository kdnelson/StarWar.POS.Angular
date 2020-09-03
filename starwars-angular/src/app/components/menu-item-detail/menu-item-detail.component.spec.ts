import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuItemDetailComponent } from './menu-item-detail.component';

describe('MenuItemDetailComponent', () => {
  let component: MenuItemDetailComponent;
  let fixture: ComponentFixture<MenuItemDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MenuItemDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuItemDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
