import {Directive, ElementRef, HostListener, inject, Renderer2} from '@angular/core';
import {ControlValueAccessor} from "@angular/forms";

@Directive({
  selector: '[appInputToUpperCase]'
})
export class UpperCaseDirective implements ControlValueAccessor{

  constructor() { }

  #el = inject(ElementRef)
  #renderer = inject(Renderer2)
  #onChange: ((value: any) => void) | undefined ;
  #onTouched: (() => void) | undefined;

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    const transformedValue = value.toUpperCase()
    console.log("input", transformedValue)
    this.update(transformedValue)
  }

  // @HostListener('keydown', ['$event'])
  // onKeyDown(evt: KeyboardEvent) {
  //   const key = evt.key;
  //   console.log(evt)
  //   if (key >= "a" && key <= "z") {
  //     const transformedValue = this.#el.nativeElement.value.trim().toUpperCase()
  //     this.update(transformedValue)
  //     evt.preventDefault();
  //   }
  // }

  @HostListener('focusout', ['$event.target.value'])
  onFocusOut(value: string): void {
    const transformedValue = value.trim().toUpperCase()
    console.log("focusout", transformedValue)
    this.update(transformedValue);
  }

  @HostListener('blur', ['$event.target.value'])
  onBlur(value: string): void {
    const transformedValue = value.trim().toUpperCase()
    console.log("blur", transformedValue)
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
