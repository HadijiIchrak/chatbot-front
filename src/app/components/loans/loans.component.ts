import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoanService } from '../../services/loan/loan.service';

import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-loans',
  templateUrl: './loans.component.html',
  styleUrls: ['./loans.component.css']
})
export class LoansComponent implements OnInit {

  p: number ;
  accountForm:FormGroup;
  accounts: any;
  loans: any;
  isFailed = false;
  errorMessage = '';
  closeResult = '';
  currentUser: any;

  constructor(private fb: FormBuilder,private loanService: LoanService,  private tokenStorageService:  TokenStorageService) { }

  ngOnInit(): void {
    this.getAccountarray();

    this.accountForm = this.fb.group({
      account: [null]
    });

    this.accountForm.get("account").valueChanges
    .subscribe(f=> {
      this.onAccountChanged(f);
  })
  }

  public getAccountarray(): void {
    this.loanService.getAccountarrayUser()
    .subscribe(
      data => {
        this.accounts=data;
        console.log(data);
      },
      err => {
        this.accounts = (err.error).message;
      });
  }

  onAccountChanged(value) {
    //get transactions table
console.log('onCountryChanged')
console.log(value)
this.loanService.getAllAccountLoans(value).subscribe(
  data => {
    this.loans=data;
    console.log("loan  !!!!",data);
 console.log();

  },
  err => {
    this.errorMessage = err.error.message;

  }
);
}

}
