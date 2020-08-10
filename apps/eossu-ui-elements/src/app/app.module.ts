import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

import { UiToolbarModule } from '@eossu/ui/toolbar';
import { UiLoadersModule } from '@eossu/ui/loaders';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, UiToolbarModule, UiLoadersModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
