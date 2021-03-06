import { NgModule, Optional, SkipSelf } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { throwIfAlreadyLoaded } from '../core/module-import-guard';

import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { OrdersComponent } from './orders/orders.component';
import { MessagesComponent } from './messages/messages.component';
import { ProductsComponent } from './products/products.component';
import { NavigationComponent } from './navigation/navigation.component';
import { CategoriesComponent } from './categories/categories.component';
import { ProductEditComponent } from './product-edit/product-edit.component';
import { CategoryEditComponent } from './category-edit/category-edit.component';
import { WarrantiesComponent } from './warranties/warranties.component';
import { WarrantyEditComponent } from './warranty-edit/warranty-edit.component';
import { WarrantyPrintComponent } from './warranty-print/warranty-print.component';

@NgModule({
    imports: [
        RouterModule,
        CommonModule,
        FormsModule
    ],
    exports: [
        HomeComponent,
        LoginComponent,
        OrdersComponent,
        MessagesComponent,
        ProductsComponent,
        NavigationComponent,
        CategoriesComponent,
        ProductEditComponent,
        CategoryEditComponent,
        WarrantiesComponent,
        WarrantyEditComponent,
        WarrantyPrintComponent
    ],
    declarations: [
        HomeComponent,
        LoginComponent,
        OrdersComponent,
        MessagesComponent,
        ProductsComponent,
        NavigationComponent,
        CategoriesComponent,
        ProductEditComponent,
        CategoryEditComponent,
        WarrantiesComponent,
        WarrantyEditComponent,
        WarrantyPrintComponent
    ]
})
export class PagesModule {
	constructor( @Optional() @SkipSelf() parentModule: CommonModule) {
		throwIfAlreadyLoaded(parentModule, 'PagesModule');
	}
}