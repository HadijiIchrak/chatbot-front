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
export class AccountService {

  constructor(private http: HttpClient, private tokenStorageService:  TokenStorageService) { }
 
  currentUser: any;

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

  getAllAccounts():  Observable<any> {
    const httpOptions = { headers: new HttpHeaders({  'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'bearer ' + this.gettoken(),
      "Access-Control-Allow-Origin": "*"})};
    return this.http.get(AUTH_API + 'accounts', httpOptions);
  }

  getAllClients():  Observable<any> {
    const httpOptions = { headers: new HttpHeaders({  'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'bearer ' + this.gettoken(),
      "Access-Control-Allow-Origin": "*"})};
    return this.http.get(AUTH_API + 'clients', httpOptions);
  }

  // http://localhost:8080/api/accounts/id
      getbyid(id: number): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({  'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'bearer ' + this.gettoken(),
          "Access-Control-Allow-Origin": "*"})};
        return this.http.get(AUTH_API +"accounts/"+id, httpOptions)
     }
  
  ///api/accounts/{id}
      deleteAccount(id: number): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({  'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'bearer ' + this.gettoken(),
          "Access-Control-Allow-Origin": "*"})};
        return this.http.delete(AUTH_API + "accounts/"+id, httpOptions)
     }

     createAccount(form): Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({   'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'bearer ' + this.gettoken(),
        "Access-Control-Allow-Origin": "*"})
      };

      if(form.type == "Saving"){
        ///api/savingaccounts
        return this.http.post(AUTH_API + 'savingaccounts/', {
          accNumber: form.accNumber,
          currency: form.currency ,
          date_of_openning:form.date_of_openning,
          clientId: form.client_id,
          balance: form.balance ,
          interest_rate: "0.05"
        }, httpOptions);

      }
      else{
        ///api/currentaccounts
        return this.http.post(AUTH_API + 'currentaccounts/', {
          accNumber: form.accNumber,
          currency: form.currency ,
          clientId: form.client_id,
          balance: form.balance ,
          min_balance: "5"
        }, httpOptions);
      }
     
    }


      ///api/cards/{id}
      updateAccount(id,form): Observable<any> {
        const httpOptions = {
          headers: new HttpHeaders({   'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'bearer ' + this.gettoken(),
          "Access-Control-Allow-Origin": "*"})
        };
        return this.http.put(AUTH_API +'accounts/'+id, {
          accNumber: form.accNumber,
          currency: form.currency ,
          balance: form.balance ,
        }, httpOptions);
      
  }


}
