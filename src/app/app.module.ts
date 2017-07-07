import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { DuberFormComponent } from './duber-form.component';

import { DuberLocationService } from './duber-location.service'


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
   providers: [
    DuberLocationService
   ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
