import { Injectable } from '@angular/core';
import {Book} from "./book";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {Observable, throwError} from 'rxjs';
import {BookRaw} from "./book-raw";
import {BookFactory} from "./book-factory";
import {catchError, map, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {
  private api = 'https://api4.angular-buch.com/secure';

  constructor(private http: HttpClient) {

  }

  private errorHandler(error: HttpErrorResponse) : Observable<any> {
    console.log("Fehler aufgetreten!");
    return throwError(error);
  }

  create(book: Book) : Observable<any> {
    return this.http.post(
      `${this.api}/book`, book, { responseType: "text"}
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  update(book: Book) : Observable<any> {
    return this.http.put(
      `${this.api}/book/${book.isbn}`,
      book,
      { responseType: "text" }
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  getAll(): Observable<Book[]> {
    return this.http.get<BookRaw[]>(`${this.api}/books`).pipe(
      map(booksRaw =>
        booksRaw.map(b => BookFactory.fromRaw(b)),
    ));
  }

  getSingle(isbn : string): Observable<Book> {
    return this.http.get<BookRaw>(
      `${this.api}/book/${isbn}`
    ).pipe(
      retry(3),
      map(b => BookFactory.fromRaw(b)),
      catchError(this.errorHandler)
    );
  }

  getAllSearch(searchTerm : string) : Observable<Book[]> {
    return this.http.get<BookRaw[]>(
      `${this.api}/books/search/${searchTerm}`
    ).pipe(
      retry(3),
      map(booksRaw =>
        booksRaw.map(b => BookFactory.fromRaw(b))),
      catchError(this.errorHandler)
    );
  }

  remove(isbn : string) : Observable<any> {
    return this.http.delete(`${this.api}/book/${isbn}`, {responseType: 'text'});
  }
}
