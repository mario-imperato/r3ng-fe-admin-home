import {Directive, ElementRef, forwardRef, HostListener, inject, Renderer2, Self} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/forms";


@Directive({
  selector: '[appInputTrimSpace]',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TrimSpaceDirective),
      multi: true
    }
  ]
})
export class TrimSpaceDirective implements ControlValueAccessor  {

  constructor() { }

  #el = inject(ElementRef)
  #renderer = inject(Renderer2)

  private onChange: ((value: any) => void) | undefined ;
  private onTouched: (() => void) | undefined;

  @HostListener('blur', ['$event.target.value'])
  onBlur(value: string): void {
    const transformedValue = value.trim()
    this.update(transformedValue);
  }

  update(transformedValue: string): void {
    this.#renderer.setProperty(this.#el.nativeElement, 'value', transformedValue)
    if (this.onChange) {
      this.onChange(transformedValue)
    }

    if (this.onTouched) {
      this.onTouched()
    }
  }

  writeValue(value: any): void {
    this.#renderer.setProperty(this.#el.nativeElement, 'value', value);
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

}
