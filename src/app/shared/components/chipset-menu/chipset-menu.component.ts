import {Component, EventEmitter, Input, Output} from '@angular/core';
import {MatChipSelectionChange, MatChipsModule} from "@angular/material/chips";
import {ChipsetConfig} from "./chipset-config";
import * as chipsetHelpers from "./chipset-config-helpers";

@Component({
    selector: 'app-chipset-menu',
    imports: [MatChipsModule],
    templateUrl: './chipset-menu.component.html',
    styleUrls: ['./chipset-menu.component.scss']
})
export class ChipsetMenuComponent {

  @Input() options : ChipsetConfig[] = []
  @Output() selected = new EventEmitter<string>();

  selectedTitle() : string {
    return chipsetHelpers.selectedTitle(this.options)
  }

  selectedSubTitle() : string | undefined {
    return chipsetHelpers.selectedSubTitle(this.options)
  }

  isSelected(id: string): boolean {
    const semLogContext = "chipset-menu-component::is-selected"
    let b = chipsetHelpers.isSelected(this.options, id)
    console.debug(`${semLogContext} - id: ${id}, selected: ${b}`)
    return b
  }
  isDisabled(id: string): boolean {
    const semLogContext = "chipset-menu-component::is-disabled"
    let b = chipsetHelpers.isDisabled(this.options, id)
    console.debug(`${semLogContext} - id: ${id}, disabled: ${b}`)
    return b
  }
  isHidden(id: string): boolean {
    const semLogContext = "chipset-menu-component::is-hidden"
    let b = chipsetHelpers.isHidden(this.options, id)
    console.debug(`${semLogContext} - id: ${id}, hidden: ${b}`)
    return b
  }
  isHighlighted(id: string): boolean {
    const semLogContext = "chipset-menu-component::is-highlighted"
    let b = chipsetHelpers.isHighlighted(this.options, id)
    console.debug(`${semLogContext} - id: ${id}, highlighted: ${b}`)
    return b
  }

  onSelectionChange(evt: MatChipSelectionChange) : void {
    const semLogContext = "chipset-menu-component::chip-selection"
    if (evt.selected) {
      let ok = chipsetHelpers.select(this.options, evt.source.id)
      if (ok) {
        console.log(`${semLogContext} - id: ${evt.source.id}`)
         this.selected.emit(evt.source.id)
      } else {
        console.error(`${semLogContext} - item cannot be selected. id: ${evt.source.id}`)
      }

      return
    }

    console.error(`${semLogContext} - not a selected event. selected: ${evt.selected}, id: ${evt.source.id}`)
  }
}
