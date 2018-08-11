import {Component, OnInit, OnChanges, SimpleChanges, NgZone, ChangeDetectorRef} from '@angular/core';
import {DutyRosterConfig} from '../../models/duty-roster-config';
import {DutyRosterService} from '../../services/duty-roster.service';

@Component({
  selector: 'app-duty-config',
  templateUrl: './duty-config.component.html',
  styleUrls: ['./duty-config.component.css']
})
export class DutyConfigComponent implements OnInit, OnChanges {
  public config: DutyRosterConfig;
  public peopleType: string = '海事人员';
  constructor(service: DutyRosterService, private cd: ChangeDetectorRef, private zone: NgZone) {
    this.config = new DutyRosterConfig();
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {

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
      this.cd.markForCheck();
      this.cd.detectChanges();
    // });
  }
}
