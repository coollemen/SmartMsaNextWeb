import {Injectable} from '@angular/core';
import { BmobService } from '../../../shared/services/bmob.service';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class DutyRosterService extends BmobService {

  constructor(private http: HttpClient) {
    super();
  }

  public getHolidays(year:number,month:number){
    let url='http://lanfly.vicp.io/api/holiday/batch?d=';
    let maxDate=this.getDaysInOneMonth(year,month);
    for(let i=0;i<maxDate;i++){
      url+=`${year}-${month}-${i+1},`
    }
    //去掉最后的逗号
    url=url.substring(0,url.length-1);
    console.log(url);
    return this.http.get(url);
  }
  /**
   * 获取指定年月的最大天数
   * @param year 年份
   * @param month 月份
   */
  private getDaysInOneMonth(year, month){
    month = parseInt(month, 10);
    var d= new Date(year, month, 0);
    return d.getDate();
  }
}
