import {APP_INITIALIZER, Inject, LOCALE_ID, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { SearchComponent } from './search/search.component';
import {httpInterceptors} from "./http-interceptors";
import {SettingsInitializerService} from "./shared/settings-initializer.service";

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
    {
      provide: APP_INITIALIZER,
      useFactory: (initService : SettingsInitializerService) => {
        return () => initService.init();
      },
      deps: [SettingsInitializerService],
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(@Inject(LOCALE_ID) locale: string) {
    console.log('DEBUG – Current Locale:', locale);
  }
}
