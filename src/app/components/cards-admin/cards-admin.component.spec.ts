import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsAdminComponent } from './cards-admin.component';

describe('CardsAdminComponent', () => {
  let component: CardsAdminComponent;
  let fixture: ComponentFixture<CardsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardsAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
