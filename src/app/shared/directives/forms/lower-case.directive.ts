import {Directive, ElementRef, HostListener, inject, Renderer2} from '@angular/core';
import {ControlValueAccessor} from "@angular/forms";

@Directive({
  selector: '[appInputToLowerCase]'
})
export class LowerCaseDirective implements ControlValueAccessor {

  constructor() { }

  #el = inject(ElementRef)
  #renderer = inject(Renderer2)
  #onChange: ((value: any) => void) | undefined ;
  #onTouched: (() => void) | undefined;

  @HostListener('input', ['($event.target as HTMLInputElement).value'])
  onInput(value: string) {
    const transformedValue = value.toLowerCase()
    this.update(transformedValue)
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value: string): void {
    const transformedValue = value.trim().toLowerCase()
    this.update(transformedValue);
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
