import { Component, OnInit } from '@angular/core';
import { AgencyService } from '../../agency.service';
import { TokenStorageService } from '../token-storage.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-clients-admin',
  templateUrl: './clients-admin.component.html',
  styleUrls: ['./clients-admin.component.css']
})
export class ClientsAdminComponent implements OnInit {

  users: any;
  agencies:any;
  error: string;
  loading = false;
  form: any = {};
  isIn = false;
  isFailed = false;
  errorMessage = '';
  currentUser: any;
  searchTerm: string;
  allu : any;



  constructor( private tokenStorageService:  TokenStorageService,private userService: UserService, private agencyService: AgencyService) { }

  gettoken(): void {
    this.currentUser = this.tokenStorageService.getToken();
    const t1 = this.currentUser;
    console.log('token',t1);
    return t1;

  }

  ngOnInit(): void {
    this.getAll();
    this.getAgencies();
  }
  public getAll(): void {
    this.userService.getAllClients()
    .subscribe(
      data => {
        this.users=data;
        this.allu= this.users;
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

  deleteClient(id: number) {
    const user = this.users.find(x => x.id === id);
    if (!user) return;
    user.isDeleting = true;
    this.userService.deleteUser(id)
        // .pipe(first())
        .subscribe(() => this.users = this.users.filter(x => x.id !== id));
}

search(value: string): void {
  this.users = this.allu.filter((val) => val.email.toLowerCase().includes(value));
}


}
