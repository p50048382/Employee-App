import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';

import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { DepartmentService } from 'src/app/shared/department.service';
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig,
} from '@angular/material/dialog';
import { EmployeeComponent } from '../employee/employee.component';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  constructor(
    private service: EmployeeService,
    private departmentService: DepartmentService,
    private dialog: MatDialog
  ) {}

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'fullName',
    'email',
    'mobile',
    'city',
    'departmentName',
    'actions',
  ];

  searchKey: string;

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  ngOnInit(): void {
    this.service.getEmployees().subscribe((list) => {
      let array = list.map((item) => {
        // console.log(item.payload.val()['department']);
        let departmentName = this.departmentService.getDepartmentName(
          item.payload.val()['department']
        );
        // console.log(departmentName);
        return {
          $key: item.key,
          departmentName,
          ...item.payload.val(),
        };
      });
      this.listData = new MatTableDataSource(array);
      this.listData.sort = this.sort;
      this.listData.paginator = this.paginator;
      this.listData.filterPredicate = (data, filter) => {
        return this.displayedColumns.some((ele) => {
          // console.log(data[ele]);
          return (
            ele != 'actions' &&
            data[ele].toString().toLowerCase().indexOf(filter) != -1
          );
        });
      };
    });
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
  applyFilter() {
    this.listData.filter = this.searchKey.trim().toLowerCase();
  }

  onCreate() {
    this.service.initializeFormGroup();
    const dialogConfig = new MatDialogConfig();
    //*To open this component inside dialog we need to instantialize in module
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(EmployeeComponent, dialogConfig);
  }

  onEdit(row) {
    // console.log(row);
    // * We have all the employee details in row and we just need to populate inside the form
    this.service.populateForm(row);

    const dialogConfig = new MatDialogConfig();
    //*To open this component inside dialog we need to instantialize in module
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(EmployeeComponent, dialogConfig);
  }
}
