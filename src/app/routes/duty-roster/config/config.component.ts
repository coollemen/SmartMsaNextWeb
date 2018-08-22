import { Component, OnInit, ViewChild } from '@angular/core';
import { _HttpClient, ModalHelper } from '@delon/theme';
import { SimpleTableColumn, SimpleTableComponent } from '@delon/abc';
import { SFSchema } from '@delon/form';
import { DutyRosterConfigEditComponent } from './edit/edit.component';
import { DutyRosterConfig } from '../models/duty-roster-config';
import { DutyRosterConfigAddComponent } from './add/add.component';
import { DutyPeople } from '../models/duty-people';
import { DutyRosterService } from '../services/duty-roster.service';

@Component({
  selector: 'app-duty-roster-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.less'],
})
export class DutyRosterConfigComponent implements OnInit {
  searchSchema: SFSchema = {
    properties: {
      name: {
        type: 'string',
        title: '姓名',
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
          widget: 'select',
        },
      },
    },
  };
  @ViewChild('st') st: SimpleTableComponent;
  columns: SimpleTableColumn[] = [
    { title: '类型', index: 'type' },
    { title: '名单', index: 'peoples' },
    { title: '索引', index: 'index' },
    {
      title: '',
      buttons: [
        // { text: '查看', click: (item: any) => `/form/${item.id}` },
        {
          text: '编辑', type: 'static', component: DutyRosterConfigEditComponent, params: (record: any) => {
            return { i: record };
          },click:()=>{this.getPeoples();}
        },
      ],
    },
  ];
  public config: DutyRosterConfig;
  public peopleType: string = '海事人员';
  public data: DutyPeople[] = [];

  constructor(private http: _HttpClient, private modal: ModalHelper, private dutyRosterService: DutyRosterService) {
    this.config = new DutyRosterConfig();
    this.getPeoples();
  }

  ngOnInit() {
  }

  getPeoples() {
    let query = this.dutyRosterService.createQuery(DutyPeople);
    this.dutyRosterService.find(DutyPeople, query).then(
      res => {
        this.data = res as DutyPeople[];
        console.log(this.data);
      },
    );

  }

  add() {
    this.modal
      .createStatic(DutyRosterConfigAddComponent, { i: {} })
      .subscribe(() => {
          this.getPeoples();
        },
        () => {
          this.getPeoples();
        });
  }
}
