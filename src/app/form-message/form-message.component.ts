import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl, NgControl} from "@angular/forms";

@Component({
  selector: 'bm-form-message',
  templateUrl: './form-message.component.html',
  styleUrls: ['./form-message.component.scss']
})
export class FormMessageComponent implements OnInit {

  @Input() control : AbstractControl;
  @Input() controlName : string;

  private allMessages = {
    title: {
      required: 'Ein Buchtitel muss angegeben werden'
    },
    isbn: {
      required: 'Es muss eine ISBN angegeben werden',
      minlength: 'Die ISBN muss mindestens 10 Zeichen haben',
      maxlength: 'Die ISBN darf höchstens 13 Zeichen haben'
    },
    published: {
      required: 'Es muss ein Erscheinungsdatum angegeben werden'
    },
    authors: {
      required: 'Es muss ein Autor angegeben werden'
    }
  };

  constructor() { }

  ngOnInit(): void {
  }

  errorsForControl(): string[] {
    const messages = this.allMessages[this.controlName];
    console.log(messages);
    if (!this.control || !this.control.errors || !messages || !this.control.dirty) {
      return null;
    }
    console.log(this.control.errors);
    console.log(Object.keys(this.control.errors).map(err => messages[err]));
    return Object.keys(this.control.errors).map(err => messages[err]);
  }
}
