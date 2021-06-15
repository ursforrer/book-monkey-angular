import { Component, OnInit } from '@angular/core';
import {Subject} from "rxjs";
import {debounceTime, distinctUntilChanged, filter, switchMap, tap} from "rxjs/operators";
import {BookStoreService} from "../shared/book-store.service";
import {Book} from "../shared/book";

@Component({
  selector: 'bm-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  keyUp$ = new Subject<string>();
  foundBooks: Book[] = [];
  isLoading = false;

  constructor(private bs: BookStoreService) { }

  ngOnInit(): void {
    this.keyUp$.pipe(
      filter(searchTerm => searchTerm.length >= 3),
      debounceTime(500),
      distinctUntilChanged(),
      tap(() => this.isLoading = true),
      switchMap(searchTerm => this.bs.getAllSearch(searchTerm)),
      tap(() => this.isLoading = false)
    )
    .subscribe(books => this.foundBooks = books);
  }

}
