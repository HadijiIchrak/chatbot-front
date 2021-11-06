import { Component, OnInit } from '@angular/core';
import { LoanService } from '../../services/loan/loan.service';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-loan-admin',
  templateUrl: './loan-admin.component.html',
  styleUrls: ['./loan-admin.component.css']
})
export class LoanAdminComponent implements OnInit {

  accounts: any;
  loans: any;
  isFailed = false;
  errorMessage = '';
  closeResult = '';
  currentUser: any;
  alll:any;

  constructor(private loanService: LoanService,  private tokenStorageService:  TokenStorageService ) { }

  gettoken(): void {
    this.currentUser = this.tokenStorageService.getToken();
    const t1 = this.currentUser;
    console.log('token',t1);
    return t1;

  }

  ngOnInit(): void {

    this.gettoken();
    this.loanService.getAllLoans().subscribe(
      data => {
        this.loans=data;
        console.log("loans table !!!!",data);
     console.log();
    
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }

  deleteLoan(id: number) {
    this.loanService.deleteLoan(id)
        // .pipe(first())
        .subscribe(() => this.loans = this.loans.filter(x => x.id !== id));
}
search(value: string): void {
  this.loans = this.alll.filter((val) => val.email.toLowerCase().includes(value));
}

}
