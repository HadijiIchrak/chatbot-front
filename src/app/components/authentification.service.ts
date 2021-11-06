import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {

  constructor(private http: HttpClient) { }

  login(usernameOrEmail: string, password: string): Observable<any> {
    return this.http.post(AUTH_API + 'signin', {
      usernameOrEmail,
      password
    }, httpOptions);
  }

  register(lastName: String, firstName: String , username: String, email: String, password: String): Observable<any> {
    return this.http.post(AUTH_API + 'signup', {
      lastName, firstName , username, email, password
    }, httpOptions);
  }
}
