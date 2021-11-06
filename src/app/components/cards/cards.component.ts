import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CardService } from '../../services/card/card.service';
import { TokenStorageService } from '../token-storage.service';


@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  p: number ;
  accountForm:FormGroup;
  accounts: any;
  cards: any;
  isFailed = false;
  errorMessage = '';
  closeResult = '';
  currentUser: any;

  constructor(private fb: FormBuilder,private cardService: CardService,  private tokenStorageService:  TokenStorageService) { }


  gettoken(): void {
    this.currentUser = this.tokenStorageService.getToken();
    const t1 = this.currentUser;
    console.log('token',t1);
    return t1;

  }

  ngOnInit(): void {
    this.getAccountarray();
    this.gettoken();

    this.accountForm = this.fb.group({
      account: [null]
    });

    this.accountForm.get("account").valueChanges
    .subscribe(f=> {
      this.onAccountChanged(f);
  })
  }

  public getAccountarray(): void {
    this.cardService.getAccountarrayUser()
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
this.cardService.getAllAccountCards(value).subscribe(
  data => {
    this.cards=data;
    console.log("card num !!!!",data);
 console.log();

  },
  err => {
    this.errorMessage = err.error.message;

  }
);
}

}
