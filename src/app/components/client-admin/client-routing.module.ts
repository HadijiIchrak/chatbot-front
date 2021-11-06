import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddeditComponent } from './addedit.component';
import { ClientsAdminComponent } from './clients-admin.component';


const routes: Routes = [
    {
        path: '', 
        children: [
            { path: '' ,  component: ClientsAdminComponent },
            { path: 'add', component: AddeditComponent},
            { path: 'edit/:id', component: AddeditComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ClientRoutingModule {
}
