import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { SimpleTableColumn, SimpleTableComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { NzI18nService, NzMessageService, zh_CN } from 'ng-zorro-antd';
import { DutyRosterConfig } from '../models/duty-roster-config';
import { DutyRosterService } from '../services/duty-roster.service';
import { DutyItem } from '../models/duty-item';
import { HolidayInfo } from '../models/holiday-info';
import { DutyRosterHolidaysAddComponent } from '../holidays/add/add.component';
import { DutyRosterHolidaysEditComponent } from '../holidays/edit/edit.component';
import { DutyPeople } from '../models/duty-people';

@Component({
  selector: 'app-duty-roster-duty-roster',
  templateUrl: './duty-roster.component.html',
})
export class DutyRosterComponent implements OnInit {
  holidayInfos: HolidayInfo[]=[];
  dutyPeoples: DutyPeople[]=[];
  dutyItems: DutyItem[]=[];
  selectedValue = new Date();

  getMonthData(date: Date): number | null {
    if (date.getMonth() === 8) {
      return 1394;
    }
    return null;
  }

  constructor(private modal: ModalHelper, private dutyRosterService: DutyRosterService, private msgSrv: NzMessageService) {
    this.holidayInfos = [];
  }

  ngOnInit() {
    this.getHolidayInfosByMonth(this.selectedValue);
  }

  onDateChanged(date: Date) {
    if (date.getMonth() != this.selectedValue.getMonth()) {
      this.getHolidayInfosByMonth(date);
    }
    this.selectedValue = date;
  }

  public getHolidayInfosByMonth(date: Date) {

    let startDate = new Date(date.getFullYear(), date.getMonth(), 1);
    let endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    // console.log(startDate);
    // console.log(endDate);
    let query = this.dutyRosterService.createQuery(HolidayInfo);
    query.greaterThanOrEqualTo('date', startDate);
    query.lessThanOrEqualTo('date', endDate);
    this.dutyRosterService.find<HolidayInfo>(HolidayInfo, query).then(
      res => {
        this.holidayInfos = res;
        console.log(this.holidayInfos);
      },
      error => {
        console.log(error);
      },
    );
  }

  public isHoliday(date: Date): boolean {
    let d = new Date(date);
    let results = this.holidayInfos.find(info => this.equleDate(new Date(info.date), d));
    if (results != null && results != undefined) {
      // console.log(date);
      return true;

    }
    else {
      return false;
    }
  }

  public getHoliday(date: Date): HolidayInfo {
    let results = this.holidayInfos.find(info => this.equleDate(new Date(info.date), date));
    if (results != null && results != undefined) {
      return results;
    }
    else {
      return null;
    }
  }

  public equleDate(d1: Date, d2: Date): boolean {
    // console.log(typeof d1);
    // console.log(typeof d2);
    if (d1.getFullYear() == d2.getFullYear() && d1.getMonth() == d2.getMonth() && d1.getDate() == d2.getDate()) {
      return true;
    }
    else {
      return false;
    }
  }

  public createDutyRosterByMonth() {
    //只支持2018年8月开始的值班记录
    if (this.selectedValue < new Date('2018-8-1')) {
      this.msgSrv.error('无法查询2018年8月之前的值班记录！');
      return;
    }
    //生产值班表
    //1、查询已生产值班表，如果已存在则直接读取并显示
    let dutyQuery = this.dutyRosterService.createQuery(DutyItem);
    //获取月头日期
    let startDate = new Date(this.selectedValue.getFullYear(), this.selectedValue.getMonth(), 1);
    //获取月末日期
    let endDate = new Date(this.selectedValue.getFullYear(), this.selectedValue.getMonth() + 1, 0);
    //设置查询条件
    dutyQuery.greaterThanOrEqualTo('date', startDate);
    dutyQuery.lessThanOrEqualTo('date', endDate);
    this.dutyRosterService.find<DutyItem>(DutyItem, dutyQuery).then(
      res => {
        if (res != null && res != undefined && res.length>0) {
          this.dutyItems = res as DutyItem[];
          console.log("查询到已经存在值班信息");
          console.log(this.dutyItems);
          return;
        } else {
          this.msgSrv.info('当月值班信息未创建！');
          //2、查询节假日信息
          let holidayQuery = this.dutyRosterService.createQuery(HolidayInfo);
          holidayQuery.greaterThanOrEqualTo('date', startDate);
          holidayQuery.lessThanOrEqualTo('date', endDate);
          this.dutyRosterService.find<HolidayInfo>(HolidayInfo, holidayQuery).then(
            res => {
              this.holidayInfos = res;
              //3、查询人员配置信息
              let peopleQuery = this.dutyRosterService.createQuery(DutyPeople);
              this.dutyRosterService.find(DutyPeople, peopleQuery).then(
                res => {
                  this.dutyPeoples = res as DutyPeople[];
                  console.log(this.dutyPeoples);
                  //创建值班表
                  this.dutyItems=this.createDutyItems(startDate,endDate,this.holidayInfos,this.dutyPeoples);
                },
              );
              console.log(this.holidayInfos);
            },
            error => {
              console.log(error);
            },
          );
        }
      },
      error => {
        this.msgSrv.error(`读取值班信息错误！【${error.code}】:${error.message}`);
      },
    );
  }

  public createDutyItems(startDate: Date, endDate: Date, holidays: HolidayInfo[], peoples: DutyPeople[]): DutyItem[] {
    let items: DutyItem[] = [];
    let tempDate = startDate;
    while (tempDate <= endDate) {
      let item = new DutyItem();
      item.date = new Date(tempDate);
      if (this.isHolidayInfo(item.date, holidays)) {
        //是节假日
        let holidayInfo = this.getHolidayInfo(item.date, holidays);
        if (holidayInfo.holiday == '节假日') {
          //节假日设置领导和海事人员值班
          //设置领导，并且将索引后移一位
          let result = this.getNameAndIndexByType('领导', peoples);
          item.leader = result.name;
          this.setIndexByType('领导', result.index);
          //设置海事人员，并且将索引后移一位
          result = this.getNameAndIndexByType('海事人员', peoples);
          item.msa = result.name;
          this.setIndexByType('海事人员', result.index);
        }
        //设置值班长，并且将索引后移一位
        let result = this.getNameAndIndexByType('值班长', peoples);
        item.commander = result.name;
        let weekday=item.date.getDay();
        if(weekday==0){
          this.setIndexByType('值班长', result.index);
        }
        //设置协管员，并且将索引后移一位
        result = this.getNameAndIndexByType('协管员', peoples);
        item.assistant = result.name;
        this.setIndexByType('协管员', result.index);
      } else {
        //不是节假日
        let weekday = item.date.getDay();
        if (weekday == 0 || weekday == 6) {
          //如果是星期天和星期六
          //设置海事人员，并且将索引后移一位
          let result = this.getNameAndIndexByType('海事人员', peoples);
          item.msa = result.name;
          this.setIndexByType('海事人员', result.index);
        }
        //设置值班长，并且将索引后移一位
        let result = this.getNameAndIndexByType('值班长', peoples);
        item.commander = result.name;
        if(weekday==0){
          this.setIndexByType('值班长', result.index);
        }
        //设置协管员，并且将索引后移一位
        result = this.getNameAndIndexByType('协管员', peoples);
        item.assistant = result.name;
        this.setIndexByType('协管员', result.index);
      }
      items.push(item);
      tempDate.setDate(tempDate.getDate()+1);
      // console.log(tempDate);
    }
    console.log(items);
    return items;
  }
  public saveDutyItems(){
    this.dutyRosterService.saveAll(this.dutyItems);
    this.dutyRosterService.saveAll(this.dutyPeoples);

  }
  public deleteDutyItems(){
    this.dutyRosterService.deleteAll(this.dutyItems);
  }
  /**
   * 是否是节假日
   * @param date
   * @param holidays
   */
  public isHolidayInfo(date: Date, holidays: HolidayInfo[]): boolean {
    let d = new Date(date);
    let results = holidays.find(info => this.equleDate(new Date(info.date), d));
    if (results != null && results != undefined) {
      return true;
    }
    else {
      return false;
    }
  }

  /**
   * 获取指定日期的节假日信息
   * @param date
   * @param holidays
   */
  public getHolidayInfo(date: Date, holidays: HolidayInfo[]): HolidayInfo {
    let results = holidays.find(info => this.equleDate(new Date(info.date), date));
    if (results != null && results != undefined) {
      return results;
    }
    else {
      return null;
    }
  }

  public getPeopleByType(type: string, peoples: DutyPeople[]): DutyPeople {
    return peoples.find(p => p.type == type);
  }

  public getNameAndIndexByType(type: string, peoples: DutyPeople[]) {
    let p = peoples.find(p => p.type == type);
    let name = p.peoples[p.index];
    let index = p.index;
    if (p.index < (p.peoples.length - 1)) {
      index++;
    }
    else {
      index = 0;
    }
    return { name: name, index: index };
  }

  public setIndexByType(type: string, index: number) {
    this.dutyPeoples[this.dutyPeoples.findIndex(p => p.type == type)].index = index;
  }
  public test(){
    let item=new DutyItem();
    item.date=new Date();
    item.assistant="金三支";
    item.commander="倪志华";
    this.dutyRosterService.save(item).then(
      res=>{
        this.msgSrv.success("保存成功！");
      },
      error=>{

      }
    );
  }
  public getDutyItem(date:Date){
    let results = this.dutyItems.find(item => this.equleDate(new Date(item.date), date));
    if (results != null && results != undefined) {
      return results;
    }
    else {
      return null;
    }
  }
}
