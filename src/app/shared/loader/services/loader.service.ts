import {Injectable, signal} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loading = signal<boolean> (false);
  private disabled: boolean = false;

  constructor() {
  }

  setDisabled(flag: boolean) {
    this.disabled = flag;
  }

  setLoading(loading: boolean) {
    if (!this.disabled) {
      this.loading.set(loading);
    }
  }

  getLoading(): boolean {
    return this.loading();
  }
}
