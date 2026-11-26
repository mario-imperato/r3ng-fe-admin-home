import {Component, computed, EventEmitter, input, Output} from '@angular/core';
import {MatIcon} from "@angular/material/icon";
import {MatTooltip} from "@angular/material/tooltip";
import {PageBarAction} from "../page-bar-action";

@Component({
  selector: 'app-float-bar',
    imports: [
        MatIcon,
        MatTooltip
    ],
  templateUrl: './float-bar.html',
  styleUrl: './float-bar.scss',
})
export class FloatBar {

    actions = input<PageBarAction[]>([]);
    @Output() command = new EventEmitter<string>();

    exec(cmd : string): any {
        console.log("app-float-bar::exec", cmd)
        this.command.emit(cmd);
    }
}
