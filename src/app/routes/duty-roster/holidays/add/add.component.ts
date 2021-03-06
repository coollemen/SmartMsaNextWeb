import { Component, OnInit} from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { SFSchema, SFUISchema } from '@delon/form';
import { DutyRosterService } from '../../services/duty-roster.service';
import { HolidayInfo } from '../../models/holiday-info';

@Component({
  selector: 'app-duty-roster-holidays-add',
  templateUrl: './add.component.html',
})
export class DutyRosterHolidaysAddComponent implements OnInit {
  i: any;
  schema: SFSchema = {
    properties: {
      date1: {
        type: 'string', title: '开始日期'
      },
      date2: {
        type: 'string', title: '结束日期'
      },
      holiday: {
        type: 'string',
        title: '类型',
        enum: [
          { label: '节假日', value: '节假日' },
          { label: '工作日', value: '工作日' },
        ],
        default: '节假日',
        ui: {
          widget: 'select'
        }
      },
      name: {
        type: 'string',
        title: '名称' ,
        default: '',
      },
    },
    required: ['date1','date2', 'holiday', 'name'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 80,
      grid: { span: 24 },
    },
    $date1: {
      widget: 'date',
  grid: { span: 12},
    },
    $date2: {
      widget: 'date',
      grid: { span: 12 },
    },
  };

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    private dutyRosterService:DutyRosterService
  ) {}

  ngOnInit(): void {

  }

  save(value: any) {

    let date1=new Date(value.date1);
    let date2=new Date(value.date2);
    console.log('比较日期');
    console.log( date1);
    console.log( date2);
    if(date1>date2){
      console.log("起始日期大于借宿日期！");
    }
    else{
      this.dutyRosterService.saveHolidaysBatch(date1,date2,value.holiday,value.name).subscribe(
        res=>{
          console.log(res);
          let response=res as Array<any>;
          let isSuccessed=true;
          for(let r of response){
            console.log(r);
            if(r.success==null){
              isSuccessed=false;
            }
          }
          if(isSuccessed){
            this.modal.close();
            this.msgSrv.success("保存成功！");
          }
          else {
            this.modal.close();
            this.msgSrv.error("保存失败！");
          }
        }
      )
    }

  }

  close() {
    this.modal.destroy();
  }
}
