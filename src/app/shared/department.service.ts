import { Injectable } from '@angular/core';

import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import * as _ from 'lodash';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  departmentList: AngularFireList<any>; //*  We will get the values  from firebase and convert into an array
  array = []; //we will save inside this array

  constructor(private firebase: AngularFireDatabase) {
    //lets populate the departmentList from firebase
    this.departmentList = this.firebase.list('departments');
    //now lets convert it into an array so that we can iterate over it.
    this.departmentList.snapshotChanges().subscribe((list) => {
      this.array = list.map((item) => {
        return {
          $key: item.key,
          ...item.payload.val(),
        };
      });
    });
  }

  getDepartmentName($key) {
    if ($key == '0') {
      return '';
    } else {
      // return this.array[$key].name;
      return _.find(this.array, (obj) => {
        // console.log($key);
        return obj.$key == $key;
      })['name'];
    }
  }
}
