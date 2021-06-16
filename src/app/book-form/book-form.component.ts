import {Component, EventEmitter, Input, OnChanges, OnInit, Output, ViewChild} from '@angular/core';
import {BookFactory} from "../shared/book-factory";
import {Form, FormArray, FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";
import {Book} from "../shared/book";
import {Thumbnail} from "../shared/thumbnail";

@Component({
  selector: 'bm-book-form',
  templateUrl: './book-form.component.html',
  styleUrls: ['./book-form.component.scss']
})
export class BookFormComponent implements OnInit, OnChanges {
  @Output() submitBook = new EventEmitter<Book>();
  bookForm : FormGroup;
  @Input() book: Book;
  @Input() editing = false;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnChanges() {
    this.initForm();
    this.setFormValues(this.book);
  }

  private setFormValues(book: Book) {
    this.bookForm.patchValue(book);

    // Special cases
    this.bookForm.setControl(
      'authors',
      this.buildAuthorsArray(book.authors)
    );
    this.bookForm.setControl(
      'thumbnails',
      this.buildThumbnailsArray(book.thumbnails)
    );
  }

  private initForm(){
    if (this.bookForm) { return; }

    this.bookForm = this.fb.group({
      title: ['', Validators.required],
      subtitle: [''],
      isbn: [{value: '', disabled: this.editing}, [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(13)
      ]],
      description: [''],
      authors: this.buildAuthorsArray(['']),
      thumbnails: this.buildThumbnailsArray([{
        title: '', url: ''
      }]),
      published: []
    });
    console.log(this.bookForm);
  }

  get authors(): FormArray {
    console.log(this.bookForm.get('authors') as FormArray);
    return this.bookForm.get('authors') as FormArray;
  }

  get thumbnails(): FormArray {
    return this.bookForm.get('thumbnails') as FormArray;
  }

  private buildAuthorsArray(values: string[]) : FormArray {
    return this.fb.array(values, Validators.required);
  }

  public buildThumbnailsArray(values: Thumbnail[]) : FormArray {
    return this.fb.array(values.map(t => this.fb.group(t)));
  }

  addAuthorControl() {
    this.authors.push(this.fb.control(''));
  }

  addThumbnailControl() {
    this.thumbnails.push(
      this.fb.group({url: '', title: ''})
    );
  }

  submitForm() {
    // Get Values from the form
    const formValue = this.bookForm.value;
    const isbn = this.editing ? this.book.isbn : formValue.isbn;

    // filter empty values
    const authors = formValue.authors.filter(author => author);
    const thumbnails = formValue.thumbnails.filter(thumbnail => thumbnail.url);

    const newBook : Book = {
      ...formValue,
      isbn,
      authors,
      thumbnails
    };

    this.submitBook.emit(newBook);
    this.bookForm.reset();
  }

}
