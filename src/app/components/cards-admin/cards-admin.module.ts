import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { cardsRoutingModule } from './cards-routing.module';

import { CardsAdminComponent } from './cards-admin.component';
import { AddeditComponent } from './addedit.component';
import { NgxPaginationModule } from 'ngx-pagination';
// import { LayoutComponent } from './layout.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        cardsRoutingModule,
        NgxPaginationModule
    ],
    declarations: [
        // LayoutComponent,
        CardsAdminComponent,
        AddeditComponent
    ]
})
export class Card {
}
