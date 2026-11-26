import {Component, signal} from '@angular/core';
import {DatePipe} from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {LoaderSpinnerComponent} from "./shared/loader/components/loader-spinner/loader-spinner.component";
import {NoOpPipe} from "./shared/pipes/no-op.pipe";

@Component({
    selector: 'app-root',
    imports: [RouterOutlet, LoaderSpinnerComponent],
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    providers: [NoOpPipe, DatePipe]
})
export class AppComponent {
    readonly title = signal('opem-fe-magazzino');
}


