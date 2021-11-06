import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddeditComponent } from './addedit.component';
import { TransactionAdminComponent } from './transaction-admin.component';


const routes: Routes = [
    {
        path: '', 
        children: [
            { path: '' ,  component: TransactionAdminComponent },
            { path: 'add', component: AddeditComponent},
            { path: 'edit/:id', component: AddeditComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TransactionRoutingModule {
}
