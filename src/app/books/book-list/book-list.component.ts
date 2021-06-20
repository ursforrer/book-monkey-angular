import {EventEmitter, Output} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {Book} from "../../shared/book";
import {select, Store} from "@ngrx/store";
import {loadBooks} from "../store/book.actions";
import {selectAllBooks, selectBooksLoading} from "../store/book.selectors";

@Component({
  selector: 'bm-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books$ = this.store.pipe(select(selectAllBooks));
  loading$ = this.store.pipe(select(selectBooksLoading));
  @Output() showDetailsEvent = new EventEmitter<Book>();

  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(loadBooks());
  }

  showDetails(book : Book) {
    this.showDetailsEvent.emit(book);
  }
}
