import { CollectionViewer } from '@angular/cdk/collections';
import { DataSource } from '@angular/cdk/table';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import {SortDirection} from "@angular/material/sort";

// export interface DataSourceResponseHeader {
//     // status: string;
//     // code: string;
//     // description: string;
//     // correlation: string;
//
//     // List related fields....
//     records: number;
// }
//
// export interface DataSourceResponse<T> {
//     header: DataSourceResponseHeader;
//     data: T;
// }

export interface DataSourceQuery {
  pathParams?: string[];
  filters?: any;
  findOptions: FindOptions;
}

export interface FindOptions {
  offset: number;
  limit: number;
  sortBy: string;
  sortDirection: SortDirection;
  withCount: boolean;
}

@Injectable()
export abstract class DataSourceBase<T> implements OnDestroy, DataSource<T> {

  public dataRowsSubject: BehaviorSubject<T[]>; // = new BehaviorSubject<ISiteDTO[]>([]);
  public loadingSubject: BehaviorSubject<boolean>; // = new BehaviorSubject<boolean>(false);
  public loading$: Observable<boolean>; // = this.loadingSubject.asObservable();

  public querySubject: Subject<undefined>; // = new Subject();
  public querySubscription: Subscription | null;

  dataSourceQuery: DataSourceQuery | undefined;
  totalNumberOfRecords = 0;

  protected constructor() {
      console.log('----------------- DataSourceBase Init()');
      this.dataRowsSubject = new BehaviorSubject<T[]>([]);
      this.loadingSubject = new BehaviorSubject<boolean>(false);
      this.loading$ = this.loadingSubject.asObservable();

      this.querySubject = new Subject();
      this.querySubscription = null;
    this.init();
  }

  init(): void {
      console.log('----------------- DataSourceBase Init()');
  }

  connect(
    collectionViewer: CollectionViewer
  ): Observable<T[] | readonly T[]> {
    console.log('----------------- DataSource connect()');
    return this.dataRowsSubject.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    console.log('----------------- DataSource dis-connect()');
    if (this.querySubscription) {
        this.querySubscription.unsubscribe();
    }
    this.dataRowsSubject.complete();
    this.loadingSubject.complete();
  }

  ngOnDestroy(): void {
    throw new Error('Method not implemented.');
  }

  query(aQuery: DataSourceQuery): void {
      this.dataSourceQuery = aQuery;
      this.loadingSubject.next(true);
      this.querySubject.next(undefined);
  }

}
