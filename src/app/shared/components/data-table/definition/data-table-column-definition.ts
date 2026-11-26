
import {NoOpPipe} from "../../../pipes/no-op.pipe";
type DataTableColumnType = 'simple' | 'action';

export class DataTableColumnDefinition {

    columnType: DataTableColumnType;
    sortable: boolean = false;
    columnId: string;
    columnHeader: string;
    columnHeaderClasses : string = 'no-class';
    columnCellClasses : string = 'no-class';
    dtoPropertyName: string[] | undefined;
    pipeTransformer : any = NoOpPipe;
    pipeTransformerArgs : string[]= [];
    dtoComputedProperty?: (el:any) => any;
    commands : DataTableCommand[] = []

    constructor(colType: DataTableColumnType, aColId: string,  aColHeader: string) {
        this.columnType = colType;
        this.columnId = aColId;
        this.columnHeader = aColHeader;
    }

    getCommands(aBean: any) : DataTableCommand[] {
        var cmds: DataTableCommand[] = [];
        for (let c of this.commands) {
            if (!c.onCondition || c.onCondition(aBean)) {
                cmds.push(c)
            }
        }
        return cmds
    }

    getColumnValue(aBean: any) : any {
        const semLogContext = "data-table-column-definition::get-column-value"

        if (this.dtoComputedProperty) {
            return this.dtoComputedProperty(aBean);
        }

        if (this.dtoPropertyName && this.dtoPropertyName.length > 0) {
            for(let i = 0; i < this.dtoPropertyName.length; i++) {
                let v = aBean;
                let nameSegs = this.dtoPropertyName[i].split('.');
                for(let i = 0; i < nameSegs.length; i++) {
                    v = v[nameSegs[i]];
                    if (!v) {
                        break
                    }
                }

                if (v) {
                    return v
                }
            }
        }

        return "";
    }

    lookup(k : string) :string {
        return this[k as keyof DataTableColumnDefinition]
    }

    withBeanPropertyName(...c : string[]) : DataTableColumnDefinition {
        this.dtoPropertyName = c
        return this
    }

    withBeanComputedProperty(f : (el:any) => any) : DataTableColumnDefinition {
        this.dtoComputedProperty = f
        return this
    }

    withPipeTransformer(t : any, ...args:string[]) : DataTableColumnDefinition {
        this.pipeTransformer = t
        this.pipeTransformerArgs = args
        return this
    }

    withSort(t : boolean) : DataTableColumnDefinition {
        this.sortable = t
        return this
    }

    withClass(c : string) : SimpleColumnDefinition {
        this.columnCellClasses = c
        return this
    }
}

export class SimpleColumnDefinition extends DataTableColumnDefinition {
    constructor(aColId: string,  aColHeader: string) {
        super('simple', aColId, aColHeader);
    }


}

export interface DataTableCommand {
    command: string;
    actionIcon: string;
    commandAdditionalData?: any;
    tooltip?: string;
    className?: string
    onCondition?: (aBean: any) => boolean
}

export class DataTableColumnDefinitionIconAction extends DataTableColumnDefinition {

    constructor(aColId: string, aColHeader: string) {
        super('action', aColId, aColHeader);

        this.columnCellClasses = "datatable-column-action-icons"
        this.columnHeaderClasses = "datatable-header-column-action-icons"

        // if ((this.columnHeader == null ||this.columnHeader.length <= 3) && this.actionIcon != null) {
        // }
    }

    override lookup(k : string) :string {
        return this[k as keyof DataTableColumnDefinitionIconAction]
    }

    withAction(triggerCommand: string, actionIcon: string, className?: string, tooltip?: string) : DataTableColumnDefinitionIconAction {
        this.commands.push({command: triggerCommand, actionIcon: actionIcon, tooltip: tooltip, className: className})
        return this
    }

    withConditionedAction(triggerCommand: string, actionIcon: string, condition: (aBean: any) => boolean, className?: string, tooltip?: string) : DataTableColumnDefinitionIconAction {
        this.commands.push({onCondition: condition, command: triggerCommand, actionIcon: actionIcon, tooltip: tooltip, className: className})
        return this
    }
}

