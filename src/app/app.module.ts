import {LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { SearchComponent } from './search/search.component';
import {httpInterceptors} from "./http-interceptors";
import {registerLocaleData} from "@angular/common";
import localDe from '@angular/common/locales/de';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [...httpInterceptors,
    { provide: LOCALE_ID, useValue: 'de'}
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor() {
   registerLocaleData(localDe);
  }
}
