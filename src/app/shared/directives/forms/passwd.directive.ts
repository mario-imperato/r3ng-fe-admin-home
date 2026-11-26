import {Directive, ElementRef, HostListener, inject, Renderer2} from '@angular/core';
import {ControlValueAccessor} from "@angular/forms";

@Directive({
  selector: '[appInputPasswd]'
})
export class PasswdDirective implements ControlValueAccessor{

  constructor() { }

  #el = inject(ElementRef)
  #renderer = inject(Renderer2)
  #onChange: ((value: any) => void) | undefined ;
  #onTouched: (() => void) | undefined;

  @HostListener('keydown', ['$event'])
  onKeyDown(evt: KeyboardEvent) {
    const keyCode = evt.code;
    const key = evt.key;
    console.log(evt.key, evt.code)
    const regex = /^[a-zA-Z0-9!@\-_.]*$/;
    if (!regex.test(key)) {
      evt.preventDefault();
    }
  }

  writeValue(value: any): void {
    this.#renderer.setProperty(this.#el.nativeElement, 'value', value);
  }

  registerOnChange(fn: any): void {
    this.#onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.#onTouched = fn;
  }

  update(transformedValue: string): void {
    this.#renderer.setProperty(this.#el.nativeElement, 'value', transformedValue)
    if (this.#onChange) {
      this.#onChange(transformedValue)
    }

    if (this.#onTouched) {
      this.#onTouched()
    }
  }

}
