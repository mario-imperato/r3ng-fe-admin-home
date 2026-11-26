import {Observable, Subject, take, takeUntil} from "rxjs";

export interface ObservableUnSubscriber {
  get observable(): Observable<boolean>;
  clear() : void;
}

export class SubjectObservableSubscriber {
  notifier: Subject<boolean>;

  constructor(aNotifier: Subject<boolean> = new Subject<boolean>()) {
    this.notifier = aNotifier;
  }

  get observable() : Observable<boolean> {
    return this.notifier;
  }

  clear() : void {
    this.notifier.next(true);
    this.notifier.complete();
  }

  takeOne<T>(observable: Observable<T>, next?: (value: T) => void, error?: (error: any) => void, complete?: () => void) {
    observable.pipe(take(1), takeUntil(this.notifier))
      .subscribe({
          next: (x) => (next != null ? next(x) : {}),
          error: (e) => (error != null ? error(e) : {}),
          complete: () => (complete != null ? complete() : {}),
        }
      );
  }

  take<T>(observable: Observable<T>, next?: (value: T) => void, error?: (error: any) => void, complete?: () => void) {
    observable.pipe(takeUntil(this.notifier))
      .subscribe({
          next: (x) => (next != null ? next(x) : {}),
          error: (e) => (error != null ? error(e) : {}),
          complete: () => (complete != null ? complete() : {}),
        }
      );
  }
}

const NullObservableUnSubscriberSubject = new Subject<boolean>();

class _NullObservableSubscriber {
  constructor() {
  }

  get observable() : Observable<boolean> {
    return NullObservableUnSubscriberSubject;
  }

  clear() {
  }
}

export const NullObservableUnSubscriber = new _NullObservableSubscriber();




