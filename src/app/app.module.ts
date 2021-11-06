import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app.routing';

import { AppComponent } from './app.component';

import { CardsComponent } from './components/cards/cards.component';
import { StatisticsComponent } from './components/statistics/statistics.component';
import { TransactionsComponent } from './components/transactions/transactions.component';
import { MessagesComponent } from './components/messages/messages.component';
import { LoansComponent } from './components/loans/loans.component';
import { SettingsComponent } from './components/settings/settings.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './home.component';
import { NavbarModule } from './components/navbar/navbar.model';
import { SidebarModule } from './components/sidebar/sidebar.model';
import { FooterModule } from './components/footer/footer.model';

import { ChartsModule } from 'ng2-charts';
import { FixedpluginModule } from './components/fixedplugin/fixedplugin.model';
import { InsComponent } from './components/ins/ins.component';
import { authInterceptorProviders } from './interceptor/interceptor.interceptor';
import { UsersComponent } from './components/users/users.component';
import { AuthGuard } from './components/security/auth.guard';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { TransactionConsultComponent } from './transaction-consult/transaction-consult.component';
import { SearchFilterPipe } from './search-filter-pipe.pipe';
import { DatePipe } from '@angular/common';
// import { MatInputModule, MatPaginatorModule, MatProgressSpinnerModule, 
//   MatSortModule, MatTableModule } from "@angular/material";

import { MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';



import {NgxPaginationModule} from 'ngx-pagination';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { AccueilComponent } from './accueil/accueil.component';
// import { UserProfileComponent } from './components/user-profile/user-profile.component';






@NgModule({
  imports: [
    AppRoutingModule,
    NgxPaginationModule,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedpluginModule,
    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    ChartsModule,
    NgbModule,
    ToastrModule.forRoot(),
    MatInputModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    
  ],
  exports: [
    ]
    ,
  declarations: [
    AppComponent,
    DashboardComponent,
    LoginComponent,
    HomeComponent,
    AppComponent,
    CardsComponent,
    StatisticsComponent,
    TransactionsComponent,
    MessagesComponent,
    LoansComponent,
    SettingsComponent,
    LoginComponent,
    InsComponent,
    UsersComponent,
    TransactionConsultComponent,
    SearchFilterPipe,
    UserProfileComponent,
    AccueilComponent
    
    


  

  ],
  providers: [authInterceptorProviders, AuthGuard,DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
