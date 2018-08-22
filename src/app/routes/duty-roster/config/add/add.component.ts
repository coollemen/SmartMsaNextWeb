import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { DutyRosterService } from '../../services/duty-roster.service';
import { DutyPeople } from '../../models/duty-people';

@Component({
  selector: 'app-duty-roster-config-add',
  templateUrl: './add.component.html',
})
export class DutyRosterConfigAddComponent implements OnInit {
  i: any;
  schema: SFSchema = {
    properties: {
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
      peoples: {
        type: 'string',
        title: '名单(\'**\',\'**\'格式)',
        default:'[\'某某某\',]',
        ui: {
          widget: 'textarea'
        }
      },
    },
    required: ['peoples','type'],
  };
  constructor(
    private modal: NzModalRef,
    public msgSrv: NzMessageService,
    public dutyRosterService: DutyRosterService,
  ) {}

  ngOnInit(): void {
  }

  save(value: any) {
    let p=new DutyPeople();
    p.type=value.type;
    var text=value.peoples as string;
    var reg = new RegExp( '\'' , "g" );
    text=text.replace(reg,"\"");
    console.log(text);
    p.peoples=JSON.parse(text);
    console.log(p);
    this.dutyRosterService.save(p).then(
      res=>{
          this.msgSrv.success('保存成功');
          this.modal.close(true);
      },
        error=>{

        }
    );
  }

  close() {
    this.modal.destroy();
  }
}
