import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { formatWithOptions } from 'util';
import { AlertService } from '../../services/alert/alert.service';
import { LoanService } from '../../services/loan/loan.service';

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
    private loanService: LoanService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
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
        amount: ['', Validators.required],
        duration: ['', Validators.required],
        type: ['', Validators.required],
        beginDate: ['', [Validators.required]],
        account_id: ['', [Validators.required]],
    }, formatWithOptions);

    if (!this.isAddMode) {
        this.loanService.getbyid(this.id)
            .pipe(first())
            .subscribe(x => this.form.patchValue(x));
    }
      
  }
  onAccountChanged(value) {
    //get transactions table
console.log('onAccountChanged')
console.log(value)
this.acc_id=value;

}

public getAccountarray(): void {
  this.loanService.getAccountarrayAdmin()
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
        this.createLoan();
    } else {
        this.updateLoan();
    }

}

private createLoan() {
  this.loanService.createLoan(this.form.value)
    
      .subscribe(() => {
          this.alertService.success('Loan added', { keepAfterRouteChange: true });
          this.router.navigate(['../'], { relativeTo: this.route });
      })
      .add();
}

private updateLoan() {
  this.loanService.updateLoan(this.id, this.form.value)
      .subscribe(() => {
          this.alertService.success('Loan updated', { keepAfterRouteChange: true });
          this.router.navigate(['../../'], { relativeTo: this.route });
          console.log("this part.......")
      })
      .add();
      console.log(this.id)

}

}
