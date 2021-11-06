import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../components/token-storage.service';
import { TransactionService } from '../services/transaction/transaction.service';

@Component({
  selector: 'app-transaction-admin',
  templateUrl: './transaction-admin.component.html',
  styleUrls: ['./transaction-admin.component.css']
})
export class TransactionAdminComponent implements OnInit {


  p: number;
  transactions: any;
  allt : any;
  isFailed = false;
  errorMessage = '';
  closeResult = '';
  searchTerm: string;
  currentUser: any;

  constructor(private transactionService: TransactionService ,  private tokenStorageService:  TokenStorageService) { }

  gettoken(): void {
    this.currentUser = this.tokenStorageService.getToken();
    const t1 = this.currentUser;
    console.log('token',t1);
    return t1;

  }
  ngOnInit(): void {
    this.gettoken();
    this.transactionService.getAllTransactions().subscribe(
      data => {
        this.transactions=data;
    this.allt= this.transactions;
        console.log("card num !!!!",data);
     console.log();
    
      },
      err => {
        this.errorMessage = err.error.message;
    
      }
    );
  }

  deleteTransaction(id: number) {
    const user = this.transactions.find(x => x.id === id);
    if (!user) return;
    user.isDeleting = true;
    this.transactionService.deleteTransactions(id)
        // .pipe(first())
        .subscribe(() => this.transactions = this.transactions.filter(x => x.id !== id));
}

search(value: string): void {
  this.transactions = this.allt.filter((val) => val.createdAt.toLowerCase().includes(value));
}

}
