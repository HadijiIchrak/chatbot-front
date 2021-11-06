import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { map } from 'rxjs/operators';
import 'rxjs/Rx';
import { AgencyService } from '../../agency.service';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  
  p: number = 1;
  users: any;
  agencies:any;
  allu:any;
  error: string;
  loading = false;
  form: any = {};
  isIn = false;
  isFailed = false;
  errorMessage = '';
  searchTerm: string;

  constructor(private userService: UserService, private agencyService: AgencyService) { }
  ngOnInit(): void {
    this.getAll();
    this.getAgencies();
    this.allu=this.users;
    
    }
   
    public getAll(): void {
      this.userService.getAll()
      .subscribe(
        data => {
          this.users=data;
          this.allu=this.users; 
          // console.log(data);
        },
        err => {
          this.users = (err.error).message;
        });
    }
    public getAgencies(): void {
      this.agencyService.getAll()
      .subscribe(
        data => {
          this.agencies=data;
          console.log(data);
        },
        err => {
          this.agencies = (err.error).message;
        });
    }
onSubmit(): void {
  this.userService.addUser(this.form).subscribe(
    data => {
      console.log(data);
      this.form = '';
      this.getAll();
    },
    err => {
      this.errorMessage = err.error.message;
      this.isFailed = true;
    }
  );
}

search(value: string): void {
  this.users = this.allu.filter((val) => val.username.toLowerCase().includes(value));
}
}