import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { MatToolbarModule } from '@angular/material/toolbar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeComponent } from './employees/employee/employee.component';
import { MaterialModule } from './material/material.module';
import { EmployeeService } from './shared/employee.service';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';

import { from } from 'rxjs';

import { environment } from '../environments/environment';
import { DepartmentService } from './shared/department.service';
import { EmployeeListComponent } from './employees/employee-list/employee-list.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeComponent,
    EmployeeListComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,

    // MatToolbarModule
  ],
  providers: [EmployeeService, DepartmentService],
  bootstrap: [AppComponent],
  entryComponents: [EmployeeComponent],
})
export class AppModule {}
