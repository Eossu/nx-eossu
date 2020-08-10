import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { UiToolbarModule } from '@eossu/ui/toolbar';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, UiToolbarModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
