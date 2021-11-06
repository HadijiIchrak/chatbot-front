import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { formatWithOptions } from 'util';
import { AlertService } from '../../services/alert/alert.service';
import { TokenStorageService } from '../token-storage.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  
  fo: any = {};
  id!: number;
  loading = false;
  submitted = false;
  currentUser:any;
  user: any = {};
  form: FormGroup;

  constructor(
    private token: TokenStorageService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private alertService: AlertService
  ) 
  {
    this.form = this.fb.group({
      firstName:[''],   
      lastName:['']
       , username:[''],
       password:[''],
      street:[''],
      suite:[''] ,
      city:[''],
      zipcode:[''],
      phone:[''],
      birth_date:['']
    })

   }

  ngOnInit(): void {

    this.currentUser = this.token.getUser();
    // console.log( this.currentUser );
    this.getUser();

   // this.userService.getone(this.currentUser.id)
   // .subscribe(x => this.form.patchValue(x));
    
  

    //   this.form = this.formBuilder.group({
    //     firstName: ['', Validators.required],
    //     lastName: ['', Validators.required],
    //     username: ['', Validators.required],
    //     email: ['', [Validators.required]],
    //     password: ['', Validators.required],
    //     zipcode: ['', Validators.required],
    //     street: ['', Validators.required],
    //     suite: ['', [Validators.required]],
    //     city: ['', [Validators.required]],
    //     phone: ['', Validators.required],
    //     joining_date: ['', [Validators.required]],
    //     birth_date: ['', [Validators.required]],
    // }, formatWithOptions);
  }
  public getUser(): void {
    this.userService.getone(this.currentUser.id)
    .subscribe(
      data => {
        this.user=data;
        console.log("info current user",data);
      },
      err => {
        this.user = (err.error).message;
      });
  }

  // convenience getter for easy access to form fields
  //get f() { return this.form.controls; }

 
 updateUser() {
  this.userService.update(this.form.value,this.currentUser.id)
      .subscribe(data => {
      console.log(data);
      this.getUser();
   }, error => console.log(error));
 }
    

}
