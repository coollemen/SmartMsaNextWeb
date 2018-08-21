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
          widget: 'select'
        }
      },
    },
  };
  @ViewChild('st') st: SimpleTableComponent;
  columns: SimpleTableColumn[] = [
    { title: '姓名' ,index:'name'},
    { title: '类型' ,index:'type'},
    { title: '上一个' ,index:'last'},
    { title: '下一个' ,index:'next'},
    { title: '是否第一个',index:'isFirst' },
    {
      title: '',
      buttons: [
        // { text: '查看', click: (item: any) => `/form/${item.id}` },
        { text: '编辑', type: 'static', component: DutyRosterConfigEditComponent, params:(record: any) =>{ return {i:record};}
      ],
    },
  ];
  public config: DutyRosterConfig;
  public peopleType: string = '海事人员';
  public data:DutyPeople[]=[];
  constructor(private http: _HttpClient, private modal: ModalHelper,private dutyRosterService:DutyRosterService) {
    this.config = new DutyRosterConfig();
    this.getPeoples();
  }

  ngOnInit() {
  }
  getPeoples(){
    let query=this.dutyRosterService.createQuery(DutyPeople);
    this.dutyRosterService.find(DutyPeople,query).then(
      res=>{
        this.data=res as DutyPeople[];
        console.log(this.data);
      }
    );

  }
  add() {
    this.modal
      .createStatic(DutyRosterConfigAddComponent, { i: {} })
      .subscribe(() => {

        },
        () => {

        });
  }

  public itemUp(item: any, type: string) {
    console.log('up' + item.toString() + '  ' + type);
  }

  public itemDown(item: any, type: string) {
    console.log('down' + item.toString() + '  ' + type);
  }

  public itemDelete(item: any, type: string) {
    console.log('delete' + item.toString() + '  ' + type);
    switch (type) {
      case '海事人员':
        this.config.msaPeoples.splice(this.config.msaPeoples.findIndex(p => p === name), 1);
        break;
      case '领导':
        this.config.leaderPeoples.splice(this.config.leaderPeoples.findIndex(p => p === name), 1);
        break;
      case '值班长':
        this.config.commanderPeoples.splice(this.config.commanderPeoples.findIndex(p => p === name), 1);
        break;
      case '协管员':
        this.config.assistantPeoples.splice(this.config.assistantPeoples.findIndex(p => p === name), 1);

        break;
      default:
        break;
    }
  }

  public addNewPeople(name: string) {
    // this.zone.run(() => {
    console.log('添加人员：' + name);
    console.log(this.peopleType);
    if (name == null || name == undefined) return;
    switch (this.peopleType) {
      case '海事人员':
        this.config.msaPeoples.push(name);
        break;
      case '领导':
        this.config.leaderPeoples.push(name);
        break;
      case '值班长':
        this.config.commanderPeoples.push(name);
        break;
      case '协管员':
        this.config.assistantPeoples.push(name);
        break;
      default:
        break;
    }
    console.log(this.config);
    // });
  }
}
