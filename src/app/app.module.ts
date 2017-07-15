import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule, JsonpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent }  from './app.component';
import { DuberFormComponent } from './duber-form.component';
import { DuberProductList } from './duber-product-list.component';

import { DuberLocationService } from './duber-location.service';
import { DuberProductSearchService } from './duber-product-search.service';
import { DuberProductFilterService } from './duber-product-filter.service';


@NgModule({
  imports:      [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    JsonpModule,
    ],
  declarations: [
    AppComponent,
    DuberFormComponent,
    DuberProductList
   ],
   providers: [
    DuberLocationService,
    DuberProductSearchService,
    DuberProductFilterService
   ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
