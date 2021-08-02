import { Component, OnInit } from '@angular/core';
import { SalesPerson } from './sales-person';

@Component({
  selector: 'app-sales-person-list',
  templateUrl: './sales-person-list-bootstrap.component.html',
  styleUrls: ['./sales-person-list.component.css'],
})
export class SalesPersonListComponent implements OnInit {
  // create array of objs
  salesPersonList: SalesPerson[] = [
    new SalesPerson('Anup', 'Kumar', 'anup.kumar@luv2code.com', 50000),
    new SalesPerson('John', 'Doe', 'john.doe@luv2code.com', 90000),
    new SalesPerson('Jane', 'Doe', 'jane.doe@luv2code.com', 80000),
    new SalesPerson('Claire', 'Murphy', 'c.murphy@luv2code.com', 55000),
    new SalesPerson('Michael', 'Jackson', 'm.jackson@luv2code.com', 70000),
  ];

  constructor() {}

  ngOnInit(): void {}
}
