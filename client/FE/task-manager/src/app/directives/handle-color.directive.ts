import { Directive, OnInit, Renderer2, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHandleColor]'
})
export class HandleColorDirective implements OnChanges {

  @Input() appHandleColor: number;

  constructor(private renderer: Renderer2, private elRef: ElementRef) { }

  colors = {
    '-1': 'grey',
    0: 'green',
    1: 'red'
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.appHandleColor) {
      this.renderer.setStyle(this.elRef.nativeElement, 'color', this.colors[this.appHandleColor]);
    }
  }
}
