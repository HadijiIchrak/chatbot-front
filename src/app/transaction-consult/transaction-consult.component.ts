import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TransactionService } from '../services/transaction/transaction.service';
import {map, startWith} from 'rxjs/operators';

import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';
import { DropdownList } from '../dropdown-list.model';

import {  ViewChild } from '@angular/core';
import { NgForm, FormControl} from '@angular/forms';

@Component({
  selector: 'app-transaction-consult',
  templateUrl: './transaction-consult.component.html',
  styleUrls: ['./transaction-consult.component.css']
})
export class TransactionConsultComponent implements OnInit {

  p: number = 1;
  accountForm:FormGroup;

  transactions: any;
  allt : any;
  accounts: any;
  isFailed = false;
  errorMessage = '';
  closeResult = '';
  searchTerm: string;

  constructor(private fb: FormBuilder,private transactionService: TransactionService,private modalService: NgbModal) { 
  }

  ngOnInit(): void {
    // this.getAll();
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
    this.transactionService.getAccountarray()
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
console.log('onAccountChanged')
console.log(value)
this.transactionService.getAllAccountTransactions(value).subscribe(
  data => {
    this.transactions=data;
    this.allt= this.transactions;
    console.log("transaction num !!!!",data);
 console.log();

  },
  err => {
    this.errorMessage = err.error.message;

  }
);
}
  search(value: string): void {
    this.transactions = this.allt.filter((val) => val.createdAt.toLowerCase().includes(value));
  }
}
