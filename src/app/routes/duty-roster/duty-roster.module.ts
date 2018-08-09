import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DutyRosterRoutingModule } from './duty-roster-routing.module';
import { DutyRosterConfigComponent } from './config/config.component';
import { DutyRosterConfigEditComponent } from './config/edit/edit.component';
import { DutyRosterConfigViewComponent } from './config/view/view.component';
import { DutyRosterComponent } from './duty-roster/duty-roster.component';
import { DutyRosterService } from './services/duty-roster.service';
import { HttpClientModule } from '@angular/common/http';
import { JsonpModule } from '@angular/http';
import { DutyRosterHolidaysComponent } from './holidays/holidays.component';


const COMPONENTS = [

  DutyRosterConfigComponent,
  DutyRosterComponent,
  DutyRosterHolidaysComponent];
const COMPONENTS_NOROUNT = [

  DutyRosterConfigEditComponent,
  DutyRosterConfigViewComponent];

@NgModule({
  imports: [
    SharedModule,
    DutyRosterRoutingModule,
    HttpClientModule,
    JsonpModule

  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  providers: [DutyRosterService],
  entryComponents: COMPONENTS_NOROUNT
})
export class DutyRosterModule { }
