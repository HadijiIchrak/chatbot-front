import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs-compat/operator/first';
import { TokenStorageService } from '../token-storage.service';
import { CardService } from '../../services/card/card.service';

@Component({
  selector: 'app-cards-admin',
  templateUrl: './cards-admin.component.html',
  styleUrls: ['./cards-admin.component.css']
})
export class CardsAdminComponent implements OnInit {
  p: number ;
  accounts: any;
  cards: any;
  isFailed = false;
  errorMessage = '';
  closeResult = '';
  currentUser: any;

  constructor(private cardService: CardService,  private tokenStorageService:  TokenStorageService) { }

  
  gettoken(): void {
    this.currentUser = this.tokenStorageService.getToken();
    const t1 = this.currentUser;
    console.log('token',t1);
    return t1;

  }

  ngOnInit(): void {
    this.gettoken();
    this.cardService.getAllCards().subscribe(
      data => {
        this.cards=data;
        console.log("card table !!!!",data);
     console.log();
    
      },
      err => {
        this.errorMessage = err.error.message;
    
      }
    );
  }

  deleteCard(id: number) {
    const user = this.cards.find(x => x.id === id);
    if (!user) return;
    user.isDeleting = true;
    this.cardService.deleteCard(id)
        // .pipe(first())
        .subscribe(() => this.cards = this.cards.filter(x => x.id !== id));
}

}


