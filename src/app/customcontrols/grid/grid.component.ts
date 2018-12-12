import { Component, OnInit, ViewChild, Input, ElementRef, Output, EventEmitter } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDatepickerInputEvent } from '@angular/material';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Angular5Csv } from 'angular5-csv/Angular5-csv';

import * as jsPdf from 'jspdf';
import 'jspdf-autotable';

import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { isNullOrUndefined } from 'util';


@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss'],
  providers: [NgbDropdownConfig]
})
export class GridComponent implements OnInit {

  displayedColumns = [];
  dataSource = new MatTableDataSource();

  @Input() filterValues: any;


  @Input() tableData: any;
  @Input() action: boolean;
  @Input() visibleColumns: any;
  @Output() getRowdata = new EventEmitter();

  @ViewChild('table') table: ElementRef;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;


  //Variable for show hide dropdown
  totalColumns = [];


  showHideColumn = new FormControl();


  constructor(private fb: FormBuilder) {

  }

  ngOnInit() {

    let users = this.tableData;

    if (!isNullOrUndefined(users)) {
      // Assign the data to the data source for the table to render
      this.dataSource = new MatTableDataSource(users);

      this.displayedColumns = Object.keys(users[0]);

      if (this.action == true) {
        this.displayedColumns.push('action');
      }

      this.displayedColumns.unshift("option");

      //Show-Hide dropdown array
      this.totalColumns = this.displayedColumns;
      this.showHideColumn.setValue(this.visibleColumns);
      this.displayedColumns = this.visibleColumns;

      this.dataSource.filterPredicate = (p: any, filter: any) => {
        // debugger;

        // console.log(filter);
        let result = true;
        let keys = Object.keys(p); // keys of the object data
        // console.log(keys);

        for (const key of keys) {
          let searchCondition = filter.conditions[key]; // get search filter method
          // console.log(searchCondition);

          if (searchCondition && searchCondition !== 'none') {
            if (filter.methods[searchCondition](p[key], filter.values[key]) === false) {
              // invoke search filter 
              result = false // if one of the filters method not succeed the row will be remove from the filter result
              break;
            }
          }
        }
        return result
      };

      this.dataSource.filter = this.filterValues;

    }
  }


  showData(rowData, status: boolean = true) {
    let data = { rowData: rowData, status: status };
    this.getRowdata.emit(data);
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  //Function for show / hide columns
  isCheck() {
    this.displayedColumns = this.showHideColumn.value;
  }

  //Excel File Export
  exportCsv() {
    new Angular5Csv(this.tableData, 'ExcelReport', { headers: this.displayedColumns });
  }

  //PDF File Export
  exportPdf() {

    let doc: any = new jsPdf('p', 'pt');
    let rows = [];

    this.tableData.forEach(key => {
      let data = [key.id, key.name, key.progress, key.color, key.date];
      rows.push(data);
    });

    doc.autoTable(this.displayedColumns, rows);
    doc.save('pdfdata.pdf');
  }

}