import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account/account.service';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-account-admin',
  templateUrl: './account-admin.component.html',
  styleUrls: ['./account-admin.component.css']
})
export class AccountsAdminComponent implements OnInit {

  p: number ;
  accounts: any;
  isFailed = false;
  errorMessage = '';
  closeResult = '';
  currentUser: any;
  constructor(private accountService: AccountService,  private tokenStorageService:  TokenStorageService) { }

  gettoken(): void {
    this.currentUser = this.tokenStorageService.getToken();
    const t1 = this.currentUser;
    console.log('token',t1);
    return t1;

  }

  ngOnInit(): void {
    this.gettoken();
    this.accountService.getAllAccounts().subscribe(
      data => {
        this.accounts=data;
        console.log("accounts table !!!!",data);
     console.log();
    
      },
      err => {
        this.errorMessage = err.error.message;
    
      }
    );
    
  }

  deleteAccount(id: number) {
    const user = this.accounts.find(x => x.id === id);
    if (!user) return;
    user.isDeleting = true;
    this.accountService.deleteAccount(id)
        // .pipe(first())
        .subscribe(() => this.accounts = this.accounts.filter(x => x.id !== id));
}

}
