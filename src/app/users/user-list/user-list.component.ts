import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {DataService, USERS} from '../../shared/data.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @Output() id = new EventEmitter();
  lastKey: any;
  filteredData = '';

  constructor(public dataService: DataService) { 
    this.dataService.getAll(USERS);
  }

  ngOnInit(): void {
  }

  onEdit(): void {

  }

  public onView(value: any): void {
    this.id.emit(value);
  }

}
