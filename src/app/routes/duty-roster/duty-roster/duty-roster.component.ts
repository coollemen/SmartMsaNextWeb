import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { SimpleTableColumn, SimpleTableComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { NzI18nService, zh_CN } from 'ng-zorro-antd';
import { DutyRosterConfig } from '../models/duty-roster-config';
import { DutyRosterService } from '../services/duty-roster.service';
import { DutyItem } from '../models/duty-item';

@Component({
  selector: 'app-duty-roster-duty-roster',
  templateUrl: './duty-roster.component.html',
})
export class DutyRosterComponent implements OnInit {
  url = `/user`;
  searchSchema: SFSchema = {
    properties: {
      name: {
        type: 'string',
        title: '姓名'
      }
    }
  };
  private date:Date;
  private config:DutyRosterConfig;
  @ViewChild('st') st: SimpleTableComponent;
  columns: SimpleTableColumn[] = [
    { title: '日期', type:'date'},
    { title: '类型'},
    { title: '假期'},
    { title: '领导'},
    { title: '值班长'},
    { title: '海事人员'},
    { title: '协管员'},
    {
      title: '',
      buttons: [
        // { text: '查看', click: (item: any) => `/form/${item.id}` },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
      ]
    }
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper,private dutyRosterService:DutyRosterService) {
    this.date=new Date();
    this.config=new DutyRosterConfig();
  }

  ngOnInit() { }
  onChange(result: Date): void {
    console.log('onChange: ', result);
  }
  add() {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

  /**
   * 创建当月值班表
   */
  public createDutyRosterByMonth(){
    //获取年份
    let year=this.date.getFullYear();
    //获取月份
    let month=this.date.getMonth()+1;
    let maxDate=this.getDaysInOneMonth(year,month);
    console.log(`${year},${month},${maxDate}`);
    let dutyItems:DutyItem[]=[];
    // for(let i=0;i<maxDate;i++){
    //   let item=new DutyItem();
    //   let day=new Date(year,month,i+1);
    //   console.log(day);
    //   item.date=day;
    //
    // }
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
