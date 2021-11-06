import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';



import { AddeditComponent } from './addedit.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ClientsAdminComponent } from './clients-admin.component';
import { ClientRoutingModule } from './client-routing.module';

@NgModule({
 
imports: [ 
    
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    ClientRoutingModule
    ],
    declarations: [
        ClientsAdminComponent,
        AddeditComponent
    ]
})
export class Client {
}
