import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import {DataService, TEST_KIT_ORDERS} from '../../shared/data.service';

@Component({
  selector: 'app-test-kit-edit',
  templateUrl: './test-kit-edit.component.html',
  styleUrls: ['./test-kit-edit.component.css']
})
export class TestKitEditComponent implements OnInit {

  @Input() data?: any;
  @Output() toggle = new EventEmitter();

  constructor(private _dataService: DataService) { }

  ngOnInit(): void {
  }

  onSubmit() : void {
    this.onUpdate();
  }

  onUpdate() : void {
    try {
      const id: any = this.data?.id;
      this._dataService.onUpdate(TEST_KIT_ORDERS, id, this.data)
      } catch (error) {
        console.error(error);
    }
  }

  onView(): void {
    this.toggle.emit();
  }

}
