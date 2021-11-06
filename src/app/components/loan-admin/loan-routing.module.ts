import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AddeditComponent } from "./addedit.component";
import { LoanAdminComponent } from "./loan-admin.component";

const routes: Routes = [
    {
        path: '', 
        children: [
            { path: '' ,  component: LoanAdminComponent },
            { path: 'add', component: AddeditComponent},
            { path: 'edit/:id', component: AddeditComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class LoanRoutingModule {
}
