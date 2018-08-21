import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';

@Component({
  selector: 'app-duty-roster-config-edit',
  templateUrl: './edit.component.html',
})
export class DutyRosterConfigEditComponent implements OnInit {
  i: any;
  schema: SFSchema = {
    properties: {
      name: {
        type: 'string', title: '姓名'
      },
      type: {
        type: 'string',
        title: '类型',
        enum: [
          { label: '领导', value: '领导' },
          { label: '值班长', value: '值班长' },
          { label: '海事人员', value: '海事人员' },
          { label: '协管员', value: '协管员' },
        ],
        default: '海事人员',
        ui: {
          widget: 'select'
        }
      },
      last: {
        type: 'string',
        title: '上一个' ,
      },
      next: {
        type: 'string',
        title: '下一个' ,
      },
      isFirst: {
        type: 'boolean',
        title: '是否是第一个' ,
        ui:{
          widget: 'boolean'
        }
      },
    },
    required: ['name','type'],
  };

  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public http: _HttpClient,
  ) {}

  ngOnInit(): void {
    console.log(this.i);
  }

  save(value: any) {

  }

  close() {
    this.modal.destroy();
  }
}
