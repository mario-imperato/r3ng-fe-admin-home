import { HttpEventType } from '@angular/common/http';

export interface RequestState {
    inProgress?: boolean;
    success?: boolean;
    error?: boolean;
    fieldErrors?: FieldErrors;

    event?: HttpEventType;
    total?: number;
    loaded?: number;
}

export interface FieldErrors {
  [field: string]: string[];
}

export type StoreRequestStateUpdater = (
  requestName: string,
  requestState: RequestState
) => void;

export let NullStoreRequestStateUpdater : StoreRequestStateUpdater =  (requestName: string, requestState: RequestState) => {}

export type CustomRequestStateUpdater = (requestState: RequestState) => void;
