import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



import { AddeditComponent } from './addedit.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { TransactionAdminComponent } from './transaction-admin.component';
import { TransactionRoutingModule } from './transaction-routing.module';


@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TransactionRoutingModule,
        NgxPaginationModule,
        CommonModule,
        FormsModule
    ],
    declarations: [
        TransactionAdminComponent,
        AddeditComponent
    ]
})
export class Transaction{
}
