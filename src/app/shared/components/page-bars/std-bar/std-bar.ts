import {Component, EventEmitter, input, Output} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {PageBarAction} from "../page-bar-action";

@Component({
  selector: 'app-std-bar',
    imports: [
        MatIcon,
        MatTooltip
    ],
  templateUrl: './std-bar.html',
  styleUrl: './std-bar.scss',
})
export class StdBar {
    actions = input<PageBarAction[]>([]);
    @Output() command = new EventEmitter<string>();

    exec(cmd : string): any {
        console.log("app-std-bar::exec", cmd)
        this.command.emit(cmd);
    }
}
