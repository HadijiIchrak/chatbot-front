import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';
import { TokenStorageService } from '../token-storage.service';


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    isLoggedIn = false;
    constructor(
        private router: Router,
        private authenticationService: TokenStorageService
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentUser = this.authenticationService.getUser();

        this.isLoggedIn = !!this.authenticationService.getToken();
        if (this.isLoggedIn) {
            // authorised so return true
            return true;
            
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}

    






// import { Injectable } from "@angular/core";
// import { ActivatedRouteSnapshot, CanActivate, Router, RouterState } from "@angular/router";
// import { Observable } from "rxjs";
// import { AuthentificationService } from "../authentification.service";

// @Injectable()
// export class AuthGuard implements CanActivate{
//     constructor(private authentificationService:AuthentificationService,private router:Router ){

//     }

//     canActivate(route:ActivatedRouteSnapshot,
//         state:RouterState):Observable<boolean>{
//             this.authentificationService.authInfo$
//             .map(authInfo => authInfo.isLoggedIn())
//             .take(1)
//             .do(allowed => {
//                 if(!allowed){
//                     this.router.navigate(['/login']);
//                 }
//             })
//         }
// }