export interface ApiResponseHeader {
  status: string;
  code: string;
  description: string;
  correlation: string;

  // List related fields....
  totalRecords: number;
  returnedRecords: number;
}

export interface ApiResponse<T> {
    header: ApiResponseHeader;
    data: T;
}

export function isApiResponseError(o: ApiResponseHeader): boolean {
  return o.status === 'error';
}

/*
export interface ApiError {
  apiError: string;
  apiErrorDescription: string;
}

export function isApiError(o: any): o is ApiError {
  return (o as ApiError).apiError !== undefined;
}
*/

