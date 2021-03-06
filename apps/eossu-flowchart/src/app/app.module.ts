import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { FlowchartModule } from '@eossu/flowchart';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FlowchartModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
