import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {  FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { CardService } from '../../services/card/card.service';
import { AlertService } from '../../services/alert/alert.service';
import { formatWithOptions } from 'util';


@Component({
  selector: 'app-addedit',
  templateUrl: './addedit.component.html',
  styleUrls: ['./addedit.component.css']
})
export class AddeditComponent implements OnInit {

  form!: FormGroup;
  id!: number;
  isAddMode!: boolean;
  loading = false;
  submitted = false;
  accounts: any;
  accountForm:FormGroup;
  acc_id:number;

  constructor(
    private fb: FormBuilder,
      private formBuilder: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private cardService: CardService,
      private alertService: AlertService
  ) {}

  ngOnInit() {
    this.getAccountarray();
    this.accountForm = this.fb.group({
        account: [null]
      });

      this.accountForm.get("account").valueChanges
      .subscribe(f=> {
        this.onAccountChanged(f);
    })
      this.id = this.route.snapshot.params['id'];
      this.isAddMode = !this.id;
      
   
      this.form = this.formBuilder.group({
          credit_card_number: ['', Validators.required],
          min_balance: ['', Validators.required],
          type: ['', Validators.required],
          account_id: ['', [Validators.required]],
      }, formatWithOptions);

      if (!this.isAddMode) {
          this.cardService.getbyid(this.id)
              .pipe(first())
              .subscribe(x => this.form.patchValue(x));
      }
  }

  onAccountChanged(value) {
    //get card table
console.log('onAccountChanged')
console.log(value)
this.acc_id=value;

}

public getAccountarray(): void {
    this.cardService.getAccountarray()
    .subscribe(
      data => {
        this.accounts=data;
        console.log(data);
      },
      err => {
        this.accounts = (err.error).message;
      });
  }

  // convenience getter for easy access to form fields
  get f() { return this.form.controls; }

  onSubmit() {
      this.submitted = true;
      this.getAccountarray();

     //  reset alerts on submit
    this.alertService.clear();
      this.loading = true;
      if (this.isAddMode) {
          this.createCard();
      } else {
          this.updateCard();
      }
  }

  private createCard() {
      this.cardService.createCard(this.form.value)
        
          .subscribe(() => {
              this.alertService.success('Card added', { keepAfterRouteChange: true });
              this.router.navigate(['../'], { relativeTo: this.route });
          })
          .add();
  }

  private updateCard() {
      this.cardService.updateCard(this.id, this.form.value)
          .subscribe(() => {
              this.alertService.success('Card updated', { keepAfterRouteChange: true });
              this.router.navigate(['../../'], { relativeTo: this.route });
          })
          .add();
          console.log(this.id)

  }
}
