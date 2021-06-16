import {Directive, Input, OnInit, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[bmDelay]'
})
export class DelayDirective implements OnInit{
  @Input() bmDelay : number;

  constructor(private template: TemplateRef<any>, private viewContainer: ViewContainerRef){ }

  ngOnInit(): void {
    setTimeout(() => {
      this.viewContainer.createEmbeddedView(this.template);
    }, this.bmDelay);
  }

}
