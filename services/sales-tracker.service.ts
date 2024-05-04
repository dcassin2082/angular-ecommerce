import { Injectable } from '@angular/core';
import * as employees from '../json/employees.json';
import * as salesHistories from '../json/salesHistories.json';
import { EmployeeDetail } from '../interfaces/employee-detail';
import { SalesHistory } from '../interfaces/sales-history';

@Injectable({
  providedIn: 'root',
})
export class SalesTrackerService {
  public employees: EmployeeDetail[];
  public employee: EmployeeDetail;
  salesHistories: SalesHistory[];
  salesHistory: SalesHistory[];
  employeeId: number = -1;
  firstName: string;
  lastName: string;
  department: string;
  title: string;
  status: string;
  rate: number;
  email: string;

  constructor() {}

  getEmployees() {
    this.employees = (employees as any).default;
  }

  getSalesHistory() {
    this.salesHistories = (salesHistories as any).default;
  }
}
