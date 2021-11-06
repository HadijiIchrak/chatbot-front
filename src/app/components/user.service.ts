import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse  } from '@angular/common/http';
// import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { catchError, retry } from 'rxjs/operators';
import { Observable, throwError  } from 'rxjs';
import { FromEventTarget } from 'rxjs/internal/observable/fromEvent';
import { Form } from '@angular/forms';




const AUTH_API = 'http://localhost:8080/api/';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
@Injectable({
  providedIn: 'root'
})
export class UserService {
  currentUser: any;
  constructor(private http: HttpClient, private tokenStorageService:  TokenStorageService) { }
  gettoken(): void {
    this.currentUser = this.tokenStorageService.getToken();
    const t1 = this.currentUser;
    console.log('token',t1);
    return t1;

  }

  getAgencies(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({  'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'bearer ' + this.gettoken(),
      "Access-Control-Allow-Origin": "*"})};
    return this.http.get(AUTH_API + 'agencies', httpOptions)
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



  getid(): void {
    this.currentUser = this.tokenStorageService.getUser();
    const t = this.currentUser.id;
    console.log('id',t);
    return t;

  }
  getAll(): Observable<any> {
    const httpOptions = { headers: new HttpHeaders({  'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'bearer ' + this.gettoken(),
      "Access-Control-Allow-Origin": "*"})};
    return this.http.get(AUTH_API + 'users', httpOptions)

 //   .pipe(  retry(3)    );//
 }
 getAllClients(): Observable<any> {
  const httpOptions = { headers: new HttpHeaders({  'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'bearer ' + this.gettoken(),
    "Access-Control-Allow-Origin": "*"})};
  return this.http.get(AUTH_API + 'users/client', httpOptions)

//   .pipe(  retry(3)    );//
}



    getone(id : number): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'bearer ' + this.gettoken()})
    };
    return this.http.get(AUTH_API + 'users/'+ id , httpOptions);
  }
  //Transactions Stat
  getstat(value : any): Observable<any> {
    this.currentUser = this.tokenStorageService.getUser();
    const t = this.currentUser.id;
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'bearer ' + this.gettoken()})
    };

    return this.http.get(AUTH_API + 'user/transactions/stats/'+value, httpOptions);
  }

  //Category stat
  getstat1(): Observable<any> {
    this.currentUser = this.tokenStorageService.getUser();
    const t = this.currentUser.id;
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'bearer ' + this.gettoken()})
    };
console.log(t)
    return this.http.get(AUTH_API + 'categstat/'+t, httpOptions);
  }

  //Category stat
  getstattype(): Observable<any> {
      this.currentUser = this.tokenStorageService.getUser();
      const t = this.currentUser.id;
      const httpOptions = {
        headers: new HttpHeaders({ 'Authorization': 'bearer ' + this.gettoken()})
      };
  console.log(t)
      return this.http.get(AUTH_API + 'typestat/'+t, httpOptions);
    }
  //Pie chart transaction gategory
  gett(): Observable<any> {
    this.currentUser = this.tokenStorageService.getUser();
    const t = this.currentUser.id;
    const httpOptions = {
      headers: new HttpHeaders({ 'Authorization': 'bearer ' + this.gettoken()})
    };

    return this.http.get(AUTH_API + 'test/'+t, httpOptions);
  }
 addClient(form: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({   'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'bearer ' + this.gettoken(),
      "Access-Control-Allow-Origin": "*"})
    };
    return this.http.post(AUTH_API + 'clients', {firstName: form.firstName,
      lastName: form.lastName
       , username:form.username,password: form.password,
      
      email :form.email,street: form.street,suite : form.suite,city: form.city,zipcode:form.zipcode,phone:form.phone,
   
      agency_id : form.agency_id,joining_date:form.joining_date, birth_date:form.birth_date,is_suspended:"false"
    }, httpOptions);
  }

  //////to be modified
  updateClient(id,form): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({   'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'bearer ' + this.gettoken(),
      "Access-Control-Allow-Origin": "*"})
    };
    return this.http.put(AUTH_API + 'clients/'+id, {firstName: form.firstName ,
      lastName: form.lastName
      , username:form.username,password: form.password,
      
      email :form.email,street: form.street,suite : form.suite,city: form.city,zipcode:form.zipcode,phone:form.phone,
   
      agency_id : form.agency_id,joining_date:form.joining_date, birth_date:form.birth_date,is_suspended:"false"
    }, httpOptions);
  }

  addUser(form): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({   'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'bearer ' + this.gettoken(),
      "Access-Control-Allow-Origin": "*"})
    };
    return this.http.post(AUTH_API + 'users', {
      lastName: form.lastName
      ,firstName: form.firstName , username:form.username,password: form.password,
      
      email :form.email,street: form.street,suite : form.suite,city: form.city,zipcode:form.zipcode,phone:form.phone,
   
      agency_id : form.agency_id,joining_date:form.joining_date, birth_date:form.birth_date,is_suspended:"false"
    }, httpOptions);
  }



  // update(form : any,id:number): Observable<any> {
  //   const {  firstName,  lastName  , password,email,street,suite, city,zipcode,phone} = form;
  //   const httpOptions = {
  //     headers: new HttpHeaders({   'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'bearer ' + this.gettoken(),
  //     "Access-Control-Allow-Origin": "*"})
  //   };
  //   console.log(form);
  //   return this.http.put(AUTH_API + 'users/'+id, {
  //     firstName,lastName, password,email,street,suite, city,zipcode,phone
  //   }, httpOptions);
  // }
  update(form : any,id:number): Observable<any> {
    const {  firstName,   
      lastName,
       username,
       password,
      street,
      suite ,
      city,
      zipcode,
      phone,
      birth_date}=form;
      console.log(form);
    const httpOptions = {
      headers: new HttpHeaders({   'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'bearer ' + this.gettoken(),
      "Access-Control-Allow-Origin": "*"})
    };
    return this.http.put(AUTH_API + 'users/'+id, {
      firstName,   
      lastName,
      username,
       password,
      street,
      suite ,
      city,
      zipcode,
      phone, 
      birth_date
   
    
    }, httpOptions);
  }

    ///api/Transactions/{id}
         deleteUser(id: number): Observable<any> {
          const httpOptions = { headers: new HttpHeaders({  'Accept': 'application/json','Content-Type': 'application/json','Authorization': 'bearer ' + this.gettoken(),
            "Access-Control-Allow-Origin": "*"})};
          return this.http.delete(AUTH_API + "users/"+id, httpOptions)
       }
}
