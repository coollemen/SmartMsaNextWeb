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
  record: any = {};
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
    public dutyRosterService: DutyRosterService,
  ) {}

  ngOnInit(): void {
  }

  save(value: any) {
    // this.http.post(`/user/${this.record.id}`, value).subscribe(res => {
    //   this.msgSrv.success('保存成功');
    //   this.modal.close(true);
    // });
    let p=new DutyPeople();
    p.name=value.name;
    p.type=value.type;
    p.last=value.last;
    p.next=value.next;
    p.isFirst=value.isFirst;
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
