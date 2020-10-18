import { Directive, OnInit, OnChanges, Renderer2, ElementRef, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appInputFieldSize]'
})
export class InputFieldSizeDirective implements OnInit {

  @Input() appInputFieldSize: HTMLDivElement;

  constructor(private renderer: Renderer2, private elRef: ElementRef) { }

  @HostListener('keyup') onKeyUp() {
    this.resize();
  }

  @HostListener('window:resize', ['$event'])
    onResize(event) {
      event.target.innerWidth;
      this.resize();
    }

  @HostListener('keydown') onkeyDown() {
    this.resize();
  }

  @HostListener('focus') onFocus() {
    this.resize();  
  }

  ngOnInit(): void {
    console.log(this.appInputFieldSize);
    console.log(this.elRef.nativeElement.offsetWidth, 'vs', this.appInputFieldSize.offsetWidth - 227);
    this.resize();
  }

  private resize(): any {
      if (this.elRef.nativeElement.offsetWidth < this.appInputFieldSize.offsetWidth - 227) {
        console.log(this.elRef.nativeElement.offsetWidth, 'vs', this.appInputFieldSize.offsetWidth - 227);
        this.renderer.setAttribute(this.elRef.nativeElement, 'size', this.elRef.nativeElement.value.length);
      } else {
        console.log(this.elRef.nativeElement.offsetWidth, 'vs', this.appInputFieldSize.offsetWidth - 227);
        this.renderer.setAttribute(this.elRef.nativeElement, 'width', String(this.appInputFieldSize.offsetWidth));
      }
  }
  
}
