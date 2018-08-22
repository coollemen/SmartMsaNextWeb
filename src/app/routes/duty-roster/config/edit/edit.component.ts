import { Component, OnInit, ViewChild } from '@angular/core';
import { NzModalRef, NzMessageService } from 'ng-zorro-antd';
import { _HttpClient } from '@delon/theme';
import { SFSchema, SFUISchema } from '@delon/form';
import { DutyPeople } from '../../models/duty-people';
import { DutyRosterService } from '../../services/duty-roster.service';

@Component({
  selector: 'app-duty-roster-config-edit',
  templateUrl: './edit.component.html',
})
export class DutyRosterConfigEditComponent implements OnInit {
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
      index: {
        type: 'number',
        title: '索引',
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
    console.log(this.i);
  }

  save(value: any) {
    let obj=this.i as DutyPeople;
    //默认peoples类型是数组，但是当修改内容后会转变为string，所以要进行判断
    if(Array.isArray(value.peoples)){
      //没有修改内容，直接赋值
      obj.peoples=value.peoples;
    }else{
      //修改过内容，将字符串转换为数组
      obj.peoples=value.peoples.split('\'');
    }
    obj.index=value.index;
    this.dutyRosterService.save(obj).then(
      res=>{
        this.msgSrv.success("保存成功！");
        this.modal.close(true);
      },
      error=>{
        console.log(`保存失败！:${error.code},${error.message}`);
        this.msgSrv.error(`保存失败！:${error.code},${error.message}`);
        this.close();
      }
  );
  }

  close() {
    this.modal.destroy();
  }
}
