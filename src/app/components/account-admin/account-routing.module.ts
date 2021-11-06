import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AccountsAdminComponent } from "./account-admin.component";
import { AddeditComponent } from "./addedit.component";

const routes: Routes = [
    {
        path: '', 
        children: [
            { path: '' ,  component: AccountsAdminComponent },
            { path: 'add', component: AddeditComponent},
            { path: 'edit/:id', component: AddeditComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AccountsRoutingModule {
}
