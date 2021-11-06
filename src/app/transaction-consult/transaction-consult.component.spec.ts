import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionConsultComponent } from './transaction-consult.component';

describe('TransactionConsultComponent', () => {
  let component: TransactionConsultComponent;
  let fixture: ComponentFixture<TransactionConsultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionConsultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionConsultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
