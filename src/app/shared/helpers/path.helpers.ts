
import { throwError } from 'rxjs';

export function slicePathString(baseHRef: string, ndxStart: number, ndxEnd: number): string[] {
  const s = baseHRef.split('/');
  if (s.length < (ndxEnd + 1)) {
    throwError(
      `BseHRef ${baseHRef} doesn't match expected format: /p1/p2/<site>/<lang>/...`
    );
  }

  return s.slice(ndxStart, ndxEnd + 1);
}
