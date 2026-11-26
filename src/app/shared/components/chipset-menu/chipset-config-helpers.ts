import {ChipsetConfig} from "./chipset-config";

export  function findOptionById(opts: ChipsetConfig[], id: string): ChipsetConfig | undefined {
    for (let o of opts) {
        if (o.id == id) {
            return o
        }
    }

    return undefined
}

export  function findSelectedOption(opts: ChipsetConfig[]): ChipsetConfig | undefined {
    for (let o of opts) {
        if (o.selected) {
            return o
        }
    }

    return undefined
}

export  function selectedTitle(opts: ChipsetConfig[]) : string {
    let o = findSelectedOption(opts)
    if (!o) {
       return "hello world!"
    }

    return o.title
}

export  function selectedSubTitle(opts: ChipsetConfig[]) : string | undefined {
    let o = findSelectedOption(opts)
    if (!o) {
        return "hello world!"
    }

    return o.subTitle
}

export  function isSelected(opts: ChipsetConfig[], id: string): boolean {
    let o = findOptionById(opts, id)
    if (o) {
        return o.selected || false
    }

    return false
}

export  function isDisabled(opts: ChipsetConfig[], id: string): boolean {
    let o = findOptionById(opts,id)
    if (o) {
        return o.selected || o.disabled || false
    }

    return false
}

export  function isHidden(opts: ChipsetConfig[], id: string): boolean {
    let o = findOptionById(opts, id)
    if (o) {
        return (/* o.selected ||*/ o.hidden) || false
    }

    return false
}

export  function isHighlighted(opts: ChipsetConfig[], id: string): boolean {
    let o = findOptionById(opts, id)
    if (o) {
        //return (!o.selected && o.highlighted) || false
        return (o.selected || o.highlighted) || false
    }

    return true
}

export function select(opts: ChipsetConfig[], id: string): boolean {
    let current = findSelectedOption(opts)
    if (current) {
        current.selected = false
    }

    let o = findOptionById(opts, id)
    if (o) {
        o.selected = true
        return true
    }

    return false
}
