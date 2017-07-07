import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { ReactiveFormsModule } from '@angular/forms';


import { AppComponent }  from './app.component';
import { DuberFormComponent } from './duber-form.component';


@NgModule({
  imports:      [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule
    ],
  declarations: [
    AppComponent,
    DuberFormComponent
   ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
