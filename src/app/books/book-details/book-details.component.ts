import { EventEmitter } from '@angular/core';
import {Component, Input, OnInit, Output} from '@angular/core';
import {Book} from "../../shared/book";
import {BookStoreService} from "../../shared/book-store.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'bm-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})
export class BookDetailsComponent implements OnInit {
  book : Book;

  constructor(private bs: BookStoreService, private route: ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    // Get isbn from url and than the book from the service
    const params = this.route.snapshot.paramMap;
    this.bs.getSingle(<string>params.get('isbn')).subscribe(res => this.book = res);
  }

  getRating(num : number) {
    return new Array(num);
  }

  removeBook() {
    if (confirm("Buch wirklich löschen")) {
      this.bs.remove(this.book.isbn).subscribe(
        res => this.router.navigate(['../'], { relativeTo: this.route})
      );
    }
  }
}
