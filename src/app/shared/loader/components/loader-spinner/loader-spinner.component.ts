import {Component, ViewEncapsulation} from '@angular/core';
import { LoaderService } from '../../services/loader.service';

@Component({
    selector: 'app-loader-spinner',
    imports: [],
    templateUrl: './loader-spinner.component.html',
    styleUrls: ['./loader-spinner.component.scss'],
    encapsulation: ViewEncapsulation.ShadowDom
})
export class LoaderSpinnerComponent {
  constructor(public loader: LoaderService) { }
}

