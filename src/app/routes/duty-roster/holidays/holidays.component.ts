import { Component, OnInit } from '@angular/core';
import { ModalHelper } from '@delon/theme';
import { DutyRosterHolidaysEditComponent } from './edit/edit.component';
import { DutyRosterService } from '../services/duty-roster.service';
import { HolidayInfo } from '../models/holiday-info';

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

  }
  onDateChanged(date:Date){
    this.selectedValue=date;
    this.getHolidayInfosByMonth(this.selectedValue);
  }
  public getHolidayInfosByMonth(date:Date){

    let startDate=new Date(date.getFullYear(),date.getMonth(),1);
    let endDate=new Date(date.getFullYear(),date.getMonth()+1,0);
    console.log(startDate);
    console.log(endDate);
    let query= this.dutyRosterService.createQuery(HolidayInfo);
    query.greaterThan('date',startDate);
    query.lessThan('date',endDate);
    this.dutyRosterService.find<HolidayInfo>(query,HolidayInfo).then(
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
      .createStatic(DutyRosterHolidaysEditComponent, { i: { date1:text,date2:text} })
      .subscribe(() => {});
  }
  public isHoliday(date:Date):boolean{
    // console.log(`比较时间${date}`);
    if(this.holidayInfos.length>0)
    console.log(this.holidayInfos[0].date);
    let d=new Date(date);
    let results=this.holidayInfos.find(info=>this.equleDate(info.date,d));
    if(results!=null) {
      console.log(date);
      return true;

    }
    else {
      return false;
    }
  }
  public getHoliday(date:Date):HolidayInfo{
    let results=this.holidayInfos.find(info=>this.equleDate(info.date,date));
    if(results!=null) {
      return results[0];
    }
    else {
      return null;
    }
  }
  public equleDate(d1:Date,d2:Date):boolean{
    console.log(typeof d1);
    console.log(typeof d2);
    if(d1.getFullYear()==d2.getFullYear()&&d1.getMonth()==d2.getMonth()&&d1.getDate()==d2.getDate()){
      return true;
    }
    else {
      return false;
    }
  }
}
