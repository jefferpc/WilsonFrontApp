import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { ViajesComponent } from './viajes/viajes.component';
import {ReactiveFormsModule} from "@angular/forms";
import { HttpClientModule } from '@angular/common/http';
import { NgHttpLoaderModule } from 'ng-http-loader/ng-http-loader.module';
import { HttpModule } from '@angular/http';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { FormsModule } from '@angular/forms';

import { ViajesService } from './viajes/viajes.service';


@NgModule({
  declarations: [
    AppComponent,
    ViajesComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AngularFontAwesomeModule,
    HttpClientModule,
    NgHttpLoaderModule,
    ReactiveFormsModule,
    HttpModule
    
  ],
  providers: [
    ViajesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
