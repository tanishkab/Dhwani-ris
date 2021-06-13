import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { CardNumberPipe } from './card-number.pipe';

import {  HttpClientModule } from '@angular/common/http';

@NgModule({
  imports:      [ BrowserModule, FormsModule , HttpClientModule],
  declarations: [ AppComponent , CardNumberPipe],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
