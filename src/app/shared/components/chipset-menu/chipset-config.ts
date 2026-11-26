import {ThemePalette} from "@angular/material/core";

export interface ChipsetConfig {
    id: string
    title: string
    subTitle?: string
    color: ThemePalette
    selected?: boolean
    disabled?: boolean
    highlighted?: boolean
    hidden?: boolean
}
