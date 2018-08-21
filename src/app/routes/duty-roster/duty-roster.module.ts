import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DutyRosterRoutingModule } from './duty-roster-routing.module';
import { DutyRosterConfigComponent } from './config/config.component';
import { DutyRosterConfigEditComponent } from './config/edit/edit.component';
import { DutyRosterConfigViewComponent } from './config/view/view.component';
import { DutyRosterComponent } from './duty-roster/duty-roster.component';
import { DutyRosterService } from './services/duty-roster.service';
import { HttpClientModule } from '@angular/common/http';
import { DutyRosterHolidaysComponent } from './holidays/holidays.component';
import { DutyRosterHolidaysEditComponent } from './holidays/edit/edit.component';
import { DutyRosterHolidaysAddComponent } from './holidays/add/add.component';
import { DutyRosterConfigAddComponent } from './config/add/add.component';


const COMPONENTS = [

  DutyRosterConfigComponent,
  DutyRosterComponent,
  DutyRosterHolidaysComponent];
const COMPONENTS_NOROUNT = [

  DutyRosterConfigAddComponent,
  DutyRosterConfigEditComponent,
  DutyRosterConfigViewComponent,
  DutyRosterHolidaysAddComponent,
  DutyRosterHolidaysEditComponent];

@NgModule({
  imports: [
    SharedModule,
    DutyRosterRoutingModule,
    HttpClientModule,

  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  providers: [DutyRosterService],
  entryComponents: COMPONENTS_NOROUNT
})
export class DutyRosterModule { }
