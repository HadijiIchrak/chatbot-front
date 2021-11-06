import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CardsAdminComponent } from './cards-admin.component';
import { AddeditComponent } from './addedit.component';


const routes: Routes = [
    {
        path: '', 
         children: [
            { path: '' ,  component: CardsAdminComponent },
            { path: 'add', component: AddeditComponent},
            { path: 'edit/:id', component: AddeditComponent }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class cardsRoutingModule { 
    
}