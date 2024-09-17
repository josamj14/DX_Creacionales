import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AbstractFactoryComponent } from "./abstract-factory/abstract-factory.component";
import { ObjectPoolComponent } from './object-pool/object-pool.component';
import { PrototypeComponent } from './prototype/prototype.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', component: HomeComponent },
    {path: 'abstract-factory', component: AbstractFactoryComponent},
    { path: 'pool-objects', component: ObjectPoolComponent },
    { path: 'prototype', component: PrototypeComponent }
];

@NgModule({
    
    imports: [RouterModule.forRoot(routes), RouterModule],
    exports: [RouterModule],

  })
  export class AppRoutingModule { }