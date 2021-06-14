import {EventEmitter, Output} from '@angular/core';
import { Component, OnInit } from '@angular/core';
import {Book} from "../shared/book";
import {BookStoreService} from "../shared/book-store.service";

@Component({
  selector: 'bm-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  books: Book[] = [];
  @Output() showDetailsEvent = new EventEmitter<Book>();

  constructor(private bs: BookStoreService) { }

  ngOnInit(): void {
    this.bs.getAll().subscribe(res => this.books = res);
  }

  showDetails(book : Book) {
    this.showDetailsEvent.emit(book);
  }
}
