import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../../../app/components/token-storage.service';

const AUTH_API = 'http://localhost:8080/api/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class LoanService {

  currentUser: any;
  constructor(private http: HttpClient, private tokenStorageService:  TokenStorageService) { }

  gettoken(): void {
    this.currentUser = this.tokenStorageService.getToken();
    const t1 = this.currentUser;
    console.log('token',t1);
    return t1;

  }

  getid(): void {
    this.currentUser = this.tokenStorageService.getUser();
    const t = this.currentUser.id;
    console.log('id',t);
    return t;

  }

  getAccountarray():  Observable<any> {
    this.currentUser = this.tokenStorageService.getUser();
    const t = this.currentUser.id;
    const id = t.toString();
    console.log('client id',id);
  
    const httpOptions = { headers: new HttpHeaders({  'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'bearer ' + this.gettoken(),
      "Access-Control-Allow-Origin": "*"})};
    return this.http.get(AUTH_API + 'accounts/client/', httpOptions);
  
  }

    // @GetMapping("/client/{id}")
    getAccountarrayUser():  Observable<any> {
      this.currentUser = this.tokenStorageService.getUser();
      const t = this.currentUser.id;
      const id = t.toString();
      console.log('client id !!!',id);
    
      const httpOptions = { headers: new HttpHeaders({  'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'bearer ' + this.gettoken(),
        "Access-Control-Allow-Origin": "*"})};
      return this.http.get(AUTH_API +'accounts/client/'+t, httpOptions);
  
    }

  getAccountarrayAdmin():  Observable<any> {

    const httpOptions = { headers: new HttpHeaders({  'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'bearer ' + this.gettoken(),
      "Access-Control-Allow-Origin": "*"})};
    return this.http.get(AUTH_API + 'accounts', httpOptions);
  }
  

    // /api/accounts/2/loans
    getAllAccountLoans(id: number): Observable<any> {
      const httpOptions = { headers: new HttpHeaders({  'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'bearer ' + this.gettoken(),
        "Access-Control-Allow-Origin": "*"})};
      return this.http.get(AUTH_API + 'accounts/'+id+"/loans", httpOptions)
   }

       // http://localhost:8080/api/loans/1
       getbyid(id: number): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({  'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'bearer ' + this.gettoken(),
          "Access-Control-Allow-Origin": "*"})};
        return this.http.get(AUTH_API +"loans/"+id, httpOptions)
     }

     //api/loans
   getAllLoans(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({  'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'bearer ' + this.gettoken(),
      "Access-Control-Allow-Origin": "*"})};
    return this.http.get(AUTH_API + "loans", httpOptions)
 }

   ///api/loan/{id}
   deleteLoan(id: number): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({  'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'bearer ' + this.gettoken(),
      "Access-Control-Allow-Origin": "*"})};
    return this.http.delete(AUTH_API + "loans/"+id, httpOptions)
 }
 
///api/accounts/{accountId}/loans
      createLoan(form): Observable<any> {
        const httpOptions = {
          headers: new HttpHeaders({   'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'bearer ' + this.gettoken(),
          "Access-Control-Allow-Origin": "*"})
        };
        return this.http.post(AUTH_API + 'accounts/'+form.account_id+'/loans', {
          type: form.type,
          amount: form.amount ,
          beginDate:form.beginDate,
          duration: form.duration
        }, httpOptions);
      }

  ///api/loans/{id}
  updateLoan(id,form): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({   'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'bearer ' + this.gettoken(),
      "Access-Control-Allow-Origin": "*"})
    };
    return this.http.put(AUTH_API +'loans/'+id, {
      type: form.type,
      amount: form.amount ,
      beginDate:form.beginDate,
      duration: form.duration
    }, httpOptions);
  
}

}
