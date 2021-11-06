import { Component, OnInit } from '@angular/core';
import { AuthentificationService } from '../authentification.service';
@Component({
  selector: 'app-ins',
  templateUrl: './ins.component.html',
  styleUrls: ['./ins.component.css']
})
export class InsComponent implements OnInit {

  form: any = {
    lastName : null ,
    firstName: null ,
    username: null,
    email: null,
    password: null
  };
  isSuccessful = false;
  isSignUpFailed = false;
  errorMessage = '';

  constructor(private authService: AuthentificationService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    const { lastName, firstName , username, email, password } = this.form;

    this.authService.register( lastName , firstName , username, email, password).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }
}
