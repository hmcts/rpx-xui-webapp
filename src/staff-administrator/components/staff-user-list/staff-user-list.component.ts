import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'exui-staff-user-list',
  templateUrl: './staff-user-list.component.html',
  styleUrls: ['./staff-user-list.component.scss']
})
export class StaffUserListComponent implements OnInit {
  public dataSource = [
    {
      name: 'First Name',
      services: ['Service 1', 'Service 2'],
      locations: ['Location 1', 'Location 2'],
      jobTitle: 'Job title',
      status: 'Active'
    },
    {
      name: 'First Name',
      services: ['Service 1', 'Service 2'],
      locations: ['Location 1', 'Location 2'],
      jobTitle: 'Job title',
      status: 'Active'
    },
    {
      name: 'First Name',
      services: ['Service 1', 'Service 2'],
      locations: ['Location 1', 'Location 2'],
      jobTitle: 'Job title',
      status: 'Active'
    }
  ];
  public displayedColumns = ['name', 'services', 'locations', 'jobTitle', 'status'];

  constructor() { }

  public ngOnInit() {
  }

}
