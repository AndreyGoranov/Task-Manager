import { Directive, OnInit, Renderer2, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appHandleColor]'
})
export class HandleColorDirective implements OnInit {

  @Input() appHandleColor: number;

  constructor(private renderer: Renderer2, private elRef: ElementRef) { }


  ngOnInit(): void {

    const colors = {
      '-1': 'grey',
      0: 'green',
      1: 'red'
    };

    this.renderer.setStyle(this.elRef.nativeElement, 'color', colors[this.appHandleColor]);
  }
}
