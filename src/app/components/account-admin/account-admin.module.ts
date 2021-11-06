import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NgxPaginationModule } from "ngx-pagination";
import { AccountsAdminComponent } from "./account-admin.component";
import { AccountsRoutingModule } from "./account-routing.module";
import { AddeditComponent } from "./addedit.component";

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        AccountsRoutingModule,
        NgxPaginationModule
    ],
    declarations: [
        // LayoutComponent,
        AccountsAdminComponent,
        AddeditComponent
    ]
})
export class Account {
}
