import { Params } from '@angular/router';

export class RouterParamsBuilder {
  static BuildParametersFromSearch<T>(...args: T[]): Params {
    const params: Params = {};

    if (args == null) {
      return params;
    }

    args.forEach(obj => {
        RouterParamsBuilder.PopulateSearchParams(params, '', obj);
        // console.log('HttpParams: ', params.toString());
    });

    return params;
  }

  private static PopulateArray<T>(
    params: Params,
    prefix: string,
    val: Array<T>
  ): void {
    val.forEach((value, index) => {
      const key = prefix + '[' + index + ']';
      RouterParamsBuilder.PopulateSearchParams(params, key, value);
      // console.log('HttpParams::PopulateArray ', params.toString());
    });


  }

  private static PopulateObject<T extends object>(
    params: Params,
    prefix: string,
    val: T
  ): void {
    const objectKeys = Object.keys(val) as Array<keyof T>;

    if (prefix) {
      prefix = prefix + '.';
    }

    for (const objKey of objectKeys) {
      const value = val[objKey];
      const key = prefix + objKey.toString();

      RouterParamsBuilder.PopulateSearchParams(params, key, value);
      // console.log('HttpParams::PopulateObject ', params.toString());
    }

  }

  private static PopulateSearchParams<T>(
    params: Params,
    key: string,
    value: any
  ): void {
    if (value instanceof Array) {
      RouterParamsBuilder.PopulateArray(params, key, value);
    } else if (value instanceof Date) {
      params[key] = value.toISOString();
    } else if (value instanceof Object) {
      RouterParamsBuilder.PopulateObject(params, key, value);
    } else {
      if (value) {
        params[key] = value.toString();
      }
      // console.log('HttpParams::PopulateSearchParams ', params.toString());
    }

  }
}
