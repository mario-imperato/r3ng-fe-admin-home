import {Injector, Pipe, PipeTransform} from '@angular/core';
import {NoOpPipe} from "./no-op.pipe";

@Pipe({
  name: 'dynamic',
  standalone: true
})
export class DynamicPipe implements PipeTransform {

  public constructor(private injector: Injector) {
  }
  transform(value: any, pipeToken: any, pipeArgs: any[]): unknown {
    if (!pipeToken) {
      return value;
    }
    else {
      let pipe = this.injector.get(pipeToken) as PipeTransform;
      return pipe.transform(value, ...pipeArgs);
    }
  }


}
