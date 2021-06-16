import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookListItemComponent } from './book-list-item/book-list-item.component';
import { BookDetailsComponent } from './book-details/book-details.component';
import { HomeComponent } from './home/home.component';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http";
import { SearchComponent } from './search/search.component';
import {httpInterceptors} from "./http-interceptors";
import {ReactiveFormsModule} from "@angular/forms";
import {DateValueAccessorModule} from "angular-date-value-accessor";
import { BookFormComponent } from './book-form/book-form.component';
import { CreateBookComponent } from './create-book/create-book.component';
import { FormMessageComponent } from './form-message/form-message.component';
import { EditBookComponent } from './edit-book/edit-book.component';

@NgModule({
  declarations: [
    AppComponent,
    BookListComponent,
    BookListItemComponent,
    BookDetailsComponent,
    HomeComponent,
    SearchComponent,
    BookFormComponent,
    CreateBookComponent,
    FormMessageComponent,
    EditBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DateValueAccessorModule,
    ReactiveFormsModule
  ],
  providers: [...httpInterceptors],
  bootstrap: [AppComponent]
})
export class AppModule { }
