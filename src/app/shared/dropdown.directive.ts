import {
  Directive,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appDropdown]',
})
export class DropdownDirective {
  @Input() dropdownMenu: ElementRef;
  @HostBinding('class.show') isOpen = false;
  @HostListener('click') toggle() {
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      this.renderer.addClass(this.dropdownMenu, 'show');
    } else {
      this.renderer.removeClass(this.dropdownMenu, 'show');
    }
  }

  constructor(private renderer: Renderer2) {}
}
