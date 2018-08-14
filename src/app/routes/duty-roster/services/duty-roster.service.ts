import { Injectable } from '@angular/core';
import { BmobService } from '../../../shared/services/bmob.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HolidayInfo } from '../models/holiday-info';


@Injectable({
  providedIn: 'root',
})
export class DutyRosterService extends BmobService {

  constructor(private http: HttpClient) {
    super();
  }

  /**
   * 批量添加节假日信息
   * @param startDate 开始日期
   * @param endDate 结束日期
   * @param holiday 节假日类型
   * @param name 节假日名称
   */
  public saveHolidaysBatch(startDate: Date, endDate: Date,holiday:string,name:string) {
    let batchheaders = {
      'X-Bmob-Application-Id': '921d1bd493411db02d8bcf1a8562b843',
      'X-Bmob-REST-API-Key': 'a2171a5687d9e98ca75443ddc431d43c',
      'Content-Type': 'application/json',
    };
    let url='https://api.bmob.cn/1/batch';
    let temp=startDate;
    let holidayInfos=[];
    while (temp<=endDate) {
      let info ={
        "holiday":holiday,
        "name":name,
        "date":{
          "__type": "Date",
          "iso":new Date(temp)
        }
      };
      holidayInfos.push(info);
      temp.setDate(temp.getDate()+1);
    }
    let requestsArray=[];
    for(let i of holidayInfos){
      requestsArray.push({
        "method": "POST",
        "path": "/1/classes/HolidayInfo",
        "body":i
      });
    }
    console.log(requestsArray);
    let batchBody={
      "requests": requestsArray
    };
    return this.http.post(url,batchBody,{headers:batchheaders});
  }

  /**
   * 获取指定年月的最大天数
   * @param year 年份
   * @param month 月份
   */
  private getDaysInOneMonth(year, month) {
    month = parseInt(month, 10);
    var d = new Date(year, month, 0);
    return d.getDate();
  }
}
