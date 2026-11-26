import { HttpParams } from '@angular/common/http';

export class HttpParamsBuilder {
  static BuildParametersFromSearch<T>(...args: T[]): HttpParams {
    let params: HttpParams = new HttpParams();

    if (args == null) {
      return params;
    }

    args.forEach(obj => {
        params = HttpParamsBuilder.PopulateSearchParams(params, '', obj);
        // console.log('HttpParams: ', params.toString());
    });

    return params;
  }

  private static PopulateArray<T>(
    params: HttpParams,
    prefix: string,
    val: Array<T>
  ): HttpParams {
    val.forEach((value, index) => {
      const key = prefix + '[' + index + ']';
      params = HttpParamsBuilder.PopulateSearchParams(params, key, value);
      // console.log('HttpParams::PopulateArray ', params.toString());
    });

    return params;
  }

  private static PopulateObject<T extends Object>(
    params: HttpParams,
    prefix: string,
    val: T
  ): HttpParams {
    const objectKeys = Object.keys(val) as Array<keyof T>;

    if (prefix) {
      prefix = prefix + '.';
    }

    for (const objKey of objectKeys) {
      const value = val[objKey];
      const key = prefix + objKey.toString();

      params = HttpParamsBuilder.PopulateSearchParams(params, key, value);
      // console.log('HttpParams::PopulateObject ', params.toString());
    }

    return params;
  }

  private static PopulateSearchParams<T>(
    params: HttpParams,
    key: string,
    value: any
  ): HttpParams {
    if (value instanceof Array) {
      params = HttpParamsBuilder.PopulateArray(params, key, value);
    } else if (value instanceof Date) {
      params = params.set(key, value.toISOString());
    } else if (value instanceof Object) {
      params = HttpParamsBuilder.PopulateObject(params, key, value);
    } else {
      if (value) {
        params = params.set(key, value.toString());
      }
      // console.log('HttpParams::PopulateSearchParams ', params.toString());
    }

    return params;
  }
}
