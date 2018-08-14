import { Component, OnInit} from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { SFSchema, SFUISchema } from '@delon/form';
import { DutyRosterService } from '../../services/duty-roster.service';
import { HolidayInfo } from '../../models/holiday-info';

@Component({
  selector: 'app-duty-roster-holidays-edit',
  templateUrl: './edit.component.html',
})
export class DutyRosterHolidaysEditComponent implements OnInit {
  i: any;
  schema: SFSchema = {
    properties: {
      date: {
        type: 'string', title: '日期'
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
    required: ['date', 'holiday', 'name'],
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 80,
      grid: { span: 24 },
    },
    $date: {
      widget: 'date',
  grid: { span: 24},
    },
  };

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    private dutyRosterService:DutyRosterService
  ) {}

  ngOnInit(): void {

  }
  delete(){
    let info=this.i.info;
    console.log(info.data);
    this.dutyRosterService.delete(info).then(
      res=>{
        this.close();
        this.msgSrv.success("删除成功！");
      },
      error=>{
        this.close();
        this.msgSrv.success(`删除失败！${error}`);
      }
    );
  }
  save(value: any) {

    let date=new Date(value.date);
    let info=this.i.info;
    info.date=new Date(value.date);
    info.holiday=value.holiday;
    info.name=value.name;
    this.dutyRosterService.save(info.data);
    this.close();
  }

  close() {
    this.modal.destroy();
  }
}
