import { EventEmitter } from '@angular/core';
import {Component, Input, OnInit, Output} from '@angular/core';
import {Book} from "../shared/book";
import {BookStoreService} from "../shared/book-store.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'bm-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  book : Book;

  constructor(private bs: BookStoreService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Get isbn from url and than the book from the service
    const params = this.route.snapshot.paramMap;
    this.book = this.bs.getSingle(<string>params.get('isbn'));
  }

  getRating(num : number) {
    return new Array(num);
  }
}
