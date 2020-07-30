import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FlowchartModule } from '@eossu/flowchart';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FlowchartModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
