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
export class CardService {
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
    return this.http.get(AUTH_API + 'accounts', httpOptions);
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

      // /api/accounts/2/cards
      getAllAccountCards(id: number): Observable<any> {
        const httpOptions = { headers: new HttpHeaders({  'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'bearer ' + this.gettoken(),
          "Access-Control-Allow-Origin": "*"})};
        return this.http.get(AUTH_API + 'accounts/'+id+"/cards", httpOptions)
     }

    // http://localhost:8080/api/cards/id
    getbyid(id: number): Observable<any> {
      const httpOptions = { headers: new HttpHeaders({  'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'bearer ' + this.gettoken(),
        "Access-Control-Allow-Origin": "*"})};
      return this.http.get(AUTH_API +"cards/"+id, httpOptions)
   }


   //api/accounts/cards
   getAllCards(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({  'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'bearer ' + this.gettoken(),
      "Access-Control-Allow-Origin": "*"})};
    return this.http.get(AUTH_API + 'accounts'+"/cards", httpOptions)
 }

    ///api/cards/{id}
    deleteCard(id: number): Observable<any> {
      const httpOptions = { headers: new HttpHeaders({  'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'bearer ' + this.gettoken(),
        "Access-Control-Allow-Origin": "*"})};
      return this.http.delete(AUTH_API + "cards/"+id, httpOptions)
   }


   createCard(form): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({   'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'bearer ' + this.gettoken(),
      "Access-Control-Allow-Origin": "*"})
    };
    return this.http.post(AUTH_API + 'accounts/'+form.account_id+'/cards', {
      credit_card_number: form.credit_card_number,
      type: form.type ,
      min_balance:form.min_balance
    }, httpOptions);
  }

  ///api/cards/{id}
     updateCard(id,form): Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({   'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'bearer ' + this.gettoken(),
        "Access-Control-Allow-Origin": "*"})
      };
      return this.http.put(AUTH_API +'cards/'+id, {
        credit_card_number: form.credit_card_number,
        min_balance:form.min_balance,
        type: form.type 
      }, httpOptions);
    
}
}