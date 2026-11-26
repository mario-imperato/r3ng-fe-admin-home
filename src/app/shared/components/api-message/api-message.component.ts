import {Component, Input} from '@angular/core';
import {MatIcon} from "@angular/material/icon";


@Component({
  selector: 'app-api-message',
  imports: [
    MatIcon
  ],
  templateUrl: './api-message.component.html',
  styleUrls: ['./api-message.component.scss']
})
export class ApiMessageComponent {
  @Input() public message: string = "";
  @Input() public mood: 'success' | 'error' | 'none' | 'warn' = 'none';

  constructor() {}

  get visible(): boolean {
    return this.mood !== 'none';
  }

  get moodStyle(): string {
    let s = '';
    switch (this.mood) {
      case 'success':
        s = 'text-success';
        break;
      case 'error':
        s = 'text-error';
        break;
      case 'warn':
        s = 'text-warn';
        break;
    }
    return s;
  }

  get icon(): string {
    let s = '';
    switch (this.mood) {
      case 'success':
        s = 'done';
        break;
      case 'error':
        s = 'error_outline';
        break;
      case 'warn':
        s = 'error_outline';
        break;
    }
    return s;
  }

}
