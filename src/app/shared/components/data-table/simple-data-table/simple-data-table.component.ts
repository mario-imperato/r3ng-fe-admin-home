import {
    AfterViewInit,
    Component,
    computed,
    EventEmitter,
    input,
    Input,
    OnInit,
    Output,
    ViewChild
} from '@angular/core';
import {DynamicPipe} from "../../../pipes/dynamic.pipe";
import {
    MatCell,
    MatCellDef, MatColumnDef,
    MatHeaderCell, MatHeaderCellDef,
    MatHeaderRow,
    MatHeaderRowDef, MatNoDataRow,
    MatRow,
    MatRowDef, MatTable, MatTableDataSource
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {MatSort, MatSortHeader, Sort} from "@angular/material/sort";
import {NgForOf, NgIf} from "@angular/common";
import {DataTableDefinition} from "../definition/data-table-definition";
import {DataTableOnCommandEvent} from "../data-table.component";
import {DataTableColumnDefinition, DataTableCommand} from "../definition/data-table-column-definition";

@Component({
    selector: 'app-simple-data-table',
    imports: [
        DynamicPipe,
        MatCell,
        MatCellDef,
        MatHeaderCell,
        MatHeaderRow,
        MatHeaderRowDef,
        MatIcon,
        MatRow,
        MatRowDef,
        MatSort,
        MatSortHeader,
        MatTable,
        MatColumnDef,
        MatHeaderCellDef,
        MatNoDataRow,
    ],
    templateUrl: './simple-data-table.component.html',
    styleUrl: './simple-data-table.component.scss'
})
export class SimpleDataTableComponent implements AfterViewInit, OnInit {
    @Output() onCommand = new EventEmitter<DataTableOnCommandEvent>();
    // @Input() dataSource : any[] | undefined | null = null;
    @Input() tableDefinition: DataTableDefinition | undefined;
    @ViewChild(MatSort) sort: MatSort | null = null;
    dataSource = input.required<MatTableDataSource<any>>()
    // @Input({required:true}) dataSource! : MatTableDataSource<any>;
    //@ViewChild(MatTable) theTable:MatTable<any>| null = null;

    actualDataSource = computed((): MatTableDataSource<any> => {
        const semLogContext = 'simple-data-table-component::computed-actual-data-source'
        console.log(semLogContext)
        this.dataSource().sort = this.sort;
        /*
        if (this.theTable) {
            console.log(semLogContext, '---- re-rendering table')
            this.theTable.renderRows()
        } else {
            console.log(semLogContext, '---- table is empty')
        }
        */

        return this.dataSource()
    })

    ngOnInit(): void {

    }

    // @Input() dataSource : MatTableDataSource<any>| null = null;

    /*
    sortCondition = signal<Sort | null>(null)
    dataSource = input.required<any[]>()
    tableDataSource = computed((): any[] => {
        const semLogContext = 'simple-data-table-component::computed-data-source'
        let elements =  this.dataSource()
        let sortEvent = this.sortCondition()
        if (sortEvent) {
            console.log(sortEvent)
            let srted = elements.sort((a, b) => {
                console.log(semLogContext, typeof a.appId);
                return  -1
            });
            for (let i = 0; i < srted.length; i++) {
                console.log(semLogContext, "sorted", srted[i])
            }
            return srted
        } else {
            console.log(semLogContext, "no sorting")
        }
        return elements;
    })
    */

    ngAfterViewInit(): void {
        const semLogContext = 'simple-data-table-component::ngAfterViewInit'
        // if (!this.dataSource) {
        //     console.log(semLogContext, "data source not there");
        // } else {
        //     console.log(semLogContext, "data source there");
        //     this.dataSource().sort = this.sort;
        // }

        /*this.dataSource!.sortingDataAccessor = (item, property) => {
            console.log('simple-data-table-component::ngAfterViewInit', 'sortingDataAccessor');
            switch(property) {
                case 'project.name': return item.project.name;
                default: return item[property];
            }
        };*/

        // this.sort!.sortChange.subscribe((sortEvent : Sort) => {
        //     //this.sortCondition.set(sortEvent)
        // });
    }

    // announceSortChange(): void {
    //     console.log('simple-data-table-component::announceSortChange');
    // }

    onColumnAction(colDef: DataTableColumnDefinition, action: DataTableCommand, item: any): void {
        console.log('simple-data-table-component::on-column-action', colDef, item);
        this.onCommand.emit({command: action.command, data: item});
    }
}
