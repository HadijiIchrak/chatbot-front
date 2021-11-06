import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './home.component';
import { CardsComponent } from './components/cards/cards.component';
import { SettingsComponent } from './components/settings/settings.component';
import { InsComponent } from './components/ins/ins.component';
// import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './components/security/auth.guard';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { TransactionConsultComponent } from './transaction-consult/transaction-consult.component';
import { LoansComponent } from './components/loans/loans.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AccueilComponent } from './accueil/accueil.component';

const cardsModule = () => import('./components/cards-admin/cards-admin.module').then(x => x.Card);
const transactionsModule = () => import('./transaction-admin/transaction-admin.module').then(x=> x.Transaction)
const loansModule = () => import('./components/loan-admin/loan-admin.module').then(x=> x.Loan)
const accountsModule = () => import('./components/account-admin/account-admin.module').then(x=> x.Account)
const clientsModule = () => import('./components/client-admin/client-admin.module').then(x=> x.Client)


export const AppRoutes: Routes = [
  {
    path: 'login', component: LoginComponent},
   {    path: 'accueil', component: AccueilComponent
  },
  {
    path: 'ins', component: InsComponent
  },
 
  {

    path: '', component: HomeComponent,
    children: [
      { path: '', redirectTo: 'login', pathMatch: 'full' },
      { path: 'login',      component: LoginComponent },
      { path: 'dashboard',      component: DashboardComponent , canActivate: [AuthGuard]  },

      { path: 'cards',      component: CardsComponent , canActivate: [AuthGuard] },
      { path: 'loans',      component: LoansComponent , canActivate: [AuthGuard]},
      { path: 'settings',      component: SettingsComponent , canActivate: [AuthGuard] },
      { path: 'profil',      component: UserProfileComponent , canActivate: [AuthGuard]},
      { path: 'users',      component: UsersComponent , canActivate: [AuthGuard]},
      { path: 'transactions',      component: TransactionsComponent , canActivate: [AuthGuard]},
      { path: 'transactions-consult',      component: TransactionConsultComponent , canActivate: [AuthGuard]},




      { path: 'cardsAdmin', loadChildren: cardsModule , canActivate: [AuthGuard]},
      { path: 'transactionsAdmin', loadChildren: transactionsModule , canActivate: [AuthGuard]},
      { path: 'loansAdmin', loadChildren: loansModule , canActivate: [AuthGuard]},
      { path: 'AccountsAdmin', loadChildren: accountsModule , canActivate: [AuthGuard]},
      { path: 'clientsAdmin', loadChildren: clientsModule , canActivate: [AuthGuard]},



          // otherwise redirect to home
      { path: '**', redirectTo: 'dashboard' , canActivate: [AuthGuard] }

    ],
   
  }
];

@NgModule({
  imports: [RouterModule.forRoot(AppRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
