import {DataTableColumnDefinition} from "./data-table-column-definition";

export class DataTableDefinition {
  displayedColumns: string[];
  columnDefinitions: DataTableColumnDefinition[];

  constructor(colDefs: DataTableColumnDefinition[]) {
    this.columnDefinitions = colDefs;

    // The iterator is used because there is the concept of filtering columns for other purposes.
    // i.e. if (!(colDef instanceof GeoplusTableColumnExportOnly)) { this.displayedColumns.push(colDef.columnDef); }
    this.displayedColumns = [];
    for (const colDef of colDefs) { this.displayedColumns.push(colDef.columnId); }
  }
}
