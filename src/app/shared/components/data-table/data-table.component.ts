import {AfterViewInit, Component, EventEmitter, input, Input, OnInit, Output, signal, ViewChild} from '@angular/core';
import {DataSourceBase, DataSourceQuery} from "../../data-source/data-source";
import {DataTableDefinition} from "./definition/data-table-definition";
import {MatPaginator} from "@angular/material/paginator";
import {MatSort, MatSortHeader, SortDirection} from "@angular/material/sort";
import {tap} from "rxjs/operators";
import {merge} from "rxjs";
import {DataTableColumnDefinition, DataTableCommand} from "./definition/data-table-column-definition";
import {
    MatCell,
    MatCellDef, MatColumnDef, MatFooterRow, MatFooterRowDef,
    MatHeaderCell,
    MatHeaderCellDef,
    MatHeaderRow, MatHeaderRowDef, MatNoDataRow,
    MatRow, MatRowDef,
    MatTable
} from "@angular/material/table";
import {MatIcon} from "@angular/material/icon";
import {DynamicPipe} from "../../pipes/dynamic.pipe";

export interface DataTableComponentViewEvent {
  pageNumber: number,
  pageSize: number,
  sortField: string,
  sortDirection: SortDirection,
}

export interface DataTablePaginatorInfo {
  pageIndex: number,
  pageSize: number,
}

export interface DataTableOnCommandEvent {
  command: string,
  data: any,
}

@Component({
    selector: 'app-data-table',
    imports: [
        MatTable,
        MatHeaderCell,
        MatCell,
        MatIcon,
        MatHeaderRow,
        MatRow,
        MatPaginator,
        MatHeaderCellDef,
        MatCellDef,
        MatHeaderRowDef,
        MatRowDef,
        DynamicPipe,
        MatNoDataRow,
        MatColumnDef,
        MatSort,
        MatSortHeader,
    ],
    templateUrl: './data-table.component.html',
    styleUrl: './data-table.component.scss'
})
export class DataTableComponent implements AfterViewInit, OnInit {

  withActions = input<boolean>(true)

  @Output() pageChanged = new EventEmitter<DataTableComponentViewEvent>();
  @Output() onCommand = new EventEmitter<DataTableOnCommandEvent>();

  @ViewChild(MatPaginator) paginator: MatPaginator | null = null;
  @ViewChild(MatSort) sort: MatSort | null = null;

  @Input() dataSource : DataSourceBase<any> | null = null;
  @Input() tableDefinition: DataTableDefinition | undefined;
  @Input() query: DataSourceQuery | undefined;
  withFirstLastButtons = input<boolean>(false)

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    console.log('----------------- DataTableComponent ngAfterViewInit()');
    this.sort!.sortChange.subscribe(() => (this.paginator!.pageIndex = 0));

    merge(this.sort!.sortChange, this.paginator!.page)
        .pipe(
            tap(() => {
              this.onPageChange(
                  this.paginator!.pageIndex,
                  this.paginator!.pageSize,
                  this.sort!.active,
                  this.sort!.direction
              );
            })
        )
        .subscribe();
  }

  resetPageIndex() {
    if (this.paginator) {
      this.paginator.pageIndex = 0;
    }
  }

  get paginatorInfo() : DataTablePaginatorInfo {
    return {
      pageIndex: (this.paginator) ? this.paginator.pageIndex : 0,
      pageSize: (this.paginator) ? this.paginator.pageSize  : 0}
  }

  onPageChange(
      pageNumber: number,
      pageSize: number,
      sortField: string,
      sortDirection: SortDirection
  ) {
    this.pageChanged.emit({
      pageNumber: pageNumber,
      pageSize: pageSize,
      sortField: sortField,
      sortDirection: sortDirection,
    })
  }

  onColumnAction(colDef: DataTableColumnDefinition, action: DataTableCommand, item: any): void {
    console.log('datat-table-component::on-column-action', colDef, item);
    this.onCommand.emit({ command: action.command, data: item });
    // this.router.navigate([item], {relativeTo: this.activatedRoute});
  }

    protected readonly DataTableColumnDefinition = DataTableColumnDefinition;
}
