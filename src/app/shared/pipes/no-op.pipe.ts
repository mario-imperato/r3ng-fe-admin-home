import {Injectable, Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'noOp',
  standalone: true
})
export class NoOpPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return value;
  }

}
