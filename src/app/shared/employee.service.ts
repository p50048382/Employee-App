import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as _ from 'lodash';
import { DateAdapter } from '@angular/material/core';
@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private firebase: AngularFireDatabase) {}
  employeeList: AngularFireList<any>;

  form: FormGroup = new FormGroup({
    $key: new FormControl(null),
    fullName: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
    mobile: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
    city: new FormControl(''),
    gender: new FormControl('1'),
    department: new FormControl('0'),
    hireDate: new FormControl(''),
    isPermanent: new FormControl(false),
  });

  initializeFormGroup() {
    this.form.setValue({
      $key: null,
      fullName: '',
      email: '',
      mobile: '',
      city: '',
      gender: '1',
      department: '0',
      hireDate: '',
      isPermanent: false,
    });
  }

  getEmployees() {
    this.employeeList = this.firebase.list('employees');
    console.log(this.firebase.list('employees').snapshotChanges());
    return this.employeeList.snapshotChanges();
  }

  insertEmployee(employee) {
    // console.log(Date(employee.hireDate));
    this.employeeList.push({
      fullName: employee.fullName,
      email: employee.email,
      city: employee.city,
      gender: employee.gender,
      department: employee.department,
      // hireDate: employee.hireDate, //?Date is not being inserted inside the firebase
      hireDate: Date.now(), //* This date is being inserted because it is in timestamp
      isPermanent: employee.isPermanent,
      mobile: employee.mobile,
    });
  }

  updateEmployee(employee) {
    this.employeeList.update(employee.$key, {
      fullName: employee.fullName,
      email: employee.email,
      city: employee.city,
      gender: employee.gender,
      department: employee.department,
      hireDate: employee.hireDate,
      isPermanent: employee.isPermanent,
      mobile: employee.mobile,
    });
  }

  deleteEmployee($key: string) {
    this.employeeList.remove($key);
  }

  populateForm(employee) {
    console.log(employee);
    this.form.setValue(_.omit(employee, 'departmentName'));
    // ?Installed lodash and omitted the department name from the form for editing
  }
}
