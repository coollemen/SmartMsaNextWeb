import { Component, OnInit } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { DutyRosterConfigEditComponent } from '../config/edit/edit.component';
import { DutyRosterHolidaysEditComponent } from './edit/edit.component';

@Component({
  selector: 'app-duty-roster-holidays',
  templateUrl: './holidays.component.html',
  styleUrls:['./holidays.component.less']
})
export class DutyRosterHolidaysComponent implements OnInit {
  listDataMap = {
    eight : [
      { type: 'warning', content: 'This is warning event.' },
      { type: 'success', content: 'This is usual event.' }
    ],
    ten   : [
      { type: 'warning', content: 'This is warning event.' },
      { type: 'success', content: 'This is usual event.' },
      { type: 'error', content: 'This is error event.' }
    ],
    eleven: [
      { type: 'warning', content: 'This is warning event' },
      { type: 'success', content: 'This is very long usual event........' },
      { type: 'error', content: 'This is error event 1.' },
      { type: 'error', content: 'This is error event 2.' },
      { type: 'error', content: 'This is error event 3.' },
      { type: 'error', content: 'This is error event 4.' }
    ]
  };
  selectedValue = new Date();
  getMonthData(date: Date): number | null {
    if (date.getMonth() === 8) {
      return 1394;
    }
    return null;
  }
  constructor(private modal: ModalHelper) { }

  ngOnInit() { }
  onDateChanged(date:Date){
    this.selectedValue=date;
  }
  public add(){
    let text=`${this.selectedValue.getFullYear()}-${this.selectedValue.getMonth()+1}-${this.selectedValue.getDate()}`
    this.modal
      .createStatic(DutyRosterHolidaysEditComponent, { i: { date1:text,date2:text} })
      .subscribe(() => {});
  }
}
