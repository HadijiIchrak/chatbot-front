



import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
// import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError  } from 'rxjs';
import { TokenStorageService } from '../app/components/token-storage.service';


const AUTH_API = 'http://localhost:8080/api/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AgencyService {
  
  currentUser: any;
  constructor(private http: HttpClient, private tokenStorageService:  TokenStorageService) { }
  gettoken(): void {
    this.currentUser = this.tokenStorageService.getToken();
    const t1 = this.currentUser;
    console.log('token',t1);
    return t1;

  }
  getAll(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({  'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'bearer ' + this.gettoken(),
      "Access-Control-Allow-Origin": "*"})};
    return this.http.get(AUTH_API + 'agencies', httpOptions)

 //   .pipe(  retry(3)    );//
 }
}
