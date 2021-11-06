import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";
import { AddeditComponent } from "./addedit.component";
import { LoanAdminComponent } from "./loan-admin.component";
import { LoanRoutingModule } from "./loan-routing.module";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        LoanRoutingModule,
        NgxPaginationModule
    ],
    declarations: [
        LoanAdminComponent,
        AddeditComponent
    ]
})
export class Loan {
}
