import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DutyRosterRoutingModule } from './duty-roster-routing.module';
import { DutyRosterConfigComponent } from './config/config.component';
import { DutyRosterConfigEditComponent } from './config/edit/edit.component';
import { DutyRosterConfigViewComponent } from './config/view/view.component';
import { DutyRosterComponent } from './duty-roster/duty-roster.component';
import { DutyRosterService } from './services/duty-roster.service';


const COMPONENTS = [

  DutyRosterConfigComponent,
  DutyRosterComponent];
const COMPONENTS_NOROUNT = [

  DutyRosterConfigEditComponent,
  DutyRosterConfigViewComponent];

@NgModule({
  imports: [
    SharedModule,
    DutyRosterRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  providers: [DutyRosterService],
  entryComponents: COMPONENTS_NOROUNT
})
export class DutyRosterModule { }
