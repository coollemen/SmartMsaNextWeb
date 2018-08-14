import { Component, OnInit } from '@angular/core';
import { ModalHelper } from '@delon/theme';
import { DutyRosterHolidaysEditComponent } from './edit/edit.component';
import { DutyRosterService } from '../services/duty-roster.service';
import { HolidayInfo } from '../models/holiday-info';
import { DutyRosterHolidaysAddComponent } from './add/add.component';

@Component({
  selector: 'app-duty-roster-holidays',
  templateUrl: './holidays.component.html',
  styleUrls:['./holidays.component.less']
})
export class DutyRosterHolidaysComponent implements OnInit {
  holidayInfos:HolidayInfo[];
  selectedValue = new Date();
  getMonthData(date: Date): number | null {
    if (date.getMonth() === 8) {
      return 1394;
    }
    return null;
  }
  constructor(private modal: ModalHelper, private dutyRosterService:DutyRosterService) {
    this.holidayInfos=[];
  }

  ngOnInit() {
    this.getHolidayInfosByMonth(this.selectedValue);
  }
  onDateChanged(date:Date){
    if(date.getMonth()!=this.selectedValue.getMonth()){
      this.getHolidayInfosByMonth(date);
    }
    this.selectedValue=date;
  }
  public getHolidayInfosByMonth(date:Date){

    let startDate=new Date(date.getFullYear(),date.getMonth(),1);
    let endDate=new Date(date.getFullYear(),date.getMonth()+1,0);
    // console.log(startDate);
    // console.log(endDate);
    let query= this.dutyRosterService.createQuery(HolidayInfo);
    query.greaterThan('date',startDate);
    query.lessThan('date',endDate);
    this.dutyRosterService.find<HolidayInfo>(HolidayInfo,query).then(
      res=>{
        this.holidayInfos=res;
        console.log(this.holidayInfos);
      },
      error=>{
        console.log(error);
      }
    );
  }
  public add(){
    let text=`${this.selectedValue.getFullYear()}-${this.selectedValue.getMonth()+1}-${this.selectedValue.getDate()}`;
    this.modal
      .createStatic(DutyRosterHolidaysAddComponent, { i: { date1:text,date2:text} })
      .subscribe(() => {});
  }
  public isHoliday(date:Date):boolean{
    let d=new Date(date);
    let results=this.holidayInfos.find(info=>this.equleDate(new Date(info.date),d));
    if(results!=null&&results!=undefined) {
      // console.log(date);
      return true;

    }
    else {
      return false;
    }
  }
  public getHoliday(date:Date):HolidayInfo{
    let results=this.holidayInfos.find(info=>this.equleDate(new Date(info.date),date));
    if(results!=null&&results!=undefined) {
      return results;
    }
    else {
      return null;
    }
  }
  public onDBClick(date:Date){
    let text=`${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
    let info=this.getHoliday(date);
    this.modal
      .createStatic(DutyRosterHolidaysEditComponent, { i: { date:text,holiday:info.holiday,name:info.name,info:info} })
      .subscribe(() => {});
  }
  public equleDate(d1:Date,d2:Date):boolean{
    // console.log(typeof d1);
    // console.log(typeof d2);
    if(d1.getFullYear()==d2.getFullYear()&&d1.getMonth()==d2.getMonth()&&d1.getDate()==d2.getDate()){
      return true;
    }
    else {
      return false;
    }
  }
}
