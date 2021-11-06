import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountsAdminComponent } from './account-admin.component';

describe('AccountAdminComponent', () => {
  let component: AccountsAdminComponent;
  let fixture: ComponentFixture<AccountsAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountsAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountsAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
