import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FlowchartModule } from '@eossu/flowchart';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FlowchartModule, BrowserAnimationsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
