import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../../components/token-storage.service';


const AUTH_API = 'http://localhost:8080/api/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
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
    return this.http.get(AUTH_API + 'accounts/client/'+ id, httpOptions);
  }

  getAccountarrayAdmin():  Observable<any> {
    const httpOptions = { headers: new HttpHeaders({  'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'bearer ' + this.gettoken(),
      "Access-Control-Allow-Origin": "*"})};
    return this.http.get(AUTH_API + 'accounts', httpOptions);
  
  }


  
//   // /api/account/{accountId}/transactions
//   getAccountTransactions(): Observable<any> {
//     const httpOptions = { headers: new HttpHeaders({  'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'bearer ' + this.gettoken(),
//       "Access-Control-Allow-Origin": "*"})};
//     return this.http.get(AUTH_API + 'transactions', httpOptions)
//  }

   

  // /api/account/{accountId}/transactions
  getAllAccountTransactions(id: number): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({  'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'bearer ' + this.gettoken(),
      "Access-Control-Allow-Origin": "*"})};
    return this.http.get(AUTH_API + 'account/'+id+"/transactions", httpOptions)
 }

 
    // http://localhost:8080/api/transactions/1
    getbyid(id: number): Observable<any> {
      const httpOptions = { headers: new HttpHeaders({  'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'bearer ' + this.gettoken(),
        "Access-Control-Allow-Origin": "*"})};
      return this.http.get(AUTH_API +"transactions/"+id, httpOptions)
   }


     //api/accounts/transactions
     getAllTransactions(): Observable<any> {
      const httpOptions = { headers: new HttpHeaders({  'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'bearer ' + this.gettoken(),
        "Access-Control-Allow-Origin": "*"})};
      return this.http.get(AUTH_API +"transactions", httpOptions)
   }

       ///api/Transactions/{id}
       deleteTransactions(id: number): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({  'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'bearer ' + this.gettoken(),
          "Access-Control-Allow-Origin": "*"})};
        return this.http.delete(AUTH_API + "transactions/"+id, httpOptions)
     }

     createTransactionAdmin(form): Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({   'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'bearer ' + this.gettoken(),
        "Access-Control-Allow-Origin": "*"})
      };
      return this.http.post(AUTH_API + 'account'+'/transactions', {
        from_account_number:form.from_account_number,
        amount: form.amount,
        to_account_number: form.to_account_number ,
        currency:form.currency,
        category_id: form.category_id,
        type:form.type
      }, httpOptions);
    }

    createTransactionUser(form): Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({   'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'bearer ' + this.gettoken(),
        "Access-Control-Allow-Origin": "*"})
      };
      return this.http.post(AUTH_API + 'account'+'/transactions', {
        from_account_number:form.from_account_number,
        amount: form.amount,
        to_account_number: form.to_account_number ,
        currency:form.currency,
        category_id: form.category_id,
        type:"withdrawal"
      }, httpOptions);
    }

//  add(form,id:number): Observable<any> {
//   const httpOptions = {
//     headers: new HttpHeaders({   'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'bearer ' + this.gettoken(),
//     "Access-Control-Allow-Origin": "*"})
//   };
//   return this.http.post(AUTH_API + 'account/'+ id+'/transactions', {
//     amount: form.amount,
//     to_account_number: form.to_account_number ,
//     from_account_number: form.account_id ,
//     currency:form.currency,
//     category_id: form.category_id,
//     type:"withdrawal"
//   }, httpOptions);
// }

 
}