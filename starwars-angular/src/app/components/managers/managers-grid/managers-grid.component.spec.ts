import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagersGridComponent } from './managers-grid.component';

describe('ManagerGridComponent', () => {
  let component: ManagersGridComponent;
  let fixture: ComponentFixture<ManagersGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagersGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagersGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
