import { Component, OnInit } from '@angular/core';
import { AgencyService } from '../../agency.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-addedit',
  templateUrl: './addedit.component.html',
  styleUrls: ['./addedit.component.css']
})
export class AddeditComponent implements OnInit {

  isFailed = false;
  errorMessage = '';
  isAddMode!: boolean;
  agencies: any;
  form:any;

  constructor(
 
      private userService: UserService,
      private agencyService: AgencyService
  ) {}


  ngOnInit() {
    
    this.getAgencies();
 
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

 


  // convenience getter for easy access to form fields
 // get f() { return this.form.controls; }



 onSubmit() {
      this.userService.addUser(this.form).subscribe(
      data => {
        console.log(data);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isFailed = true;
      }
    );
  }
     

// updateClient() {
    //  this.userService.updateClient(this.id, this.form)
       //   .subscribe(() => {
         //     this.alertService.success('Client updated', { keepAfterRouteChange: true });
         //     this.router.navigate(['../../'], { relativeTo: this.route });
      //    })
        //  .add();
//console.log(this.id)

  }

function getAgencies() {
  throw new Error('Function not implemented.');
}

