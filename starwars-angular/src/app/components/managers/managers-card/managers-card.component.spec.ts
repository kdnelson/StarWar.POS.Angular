import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagersCardComponent } from './managers-card.component';

describe('ManagersCardComponent', () => {
  let component: ManagersCardComponent;
  let fixture: ComponentFixture<ManagersCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagersCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagersCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
