import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DutyRosterRoutingModule } from './duty-roster-routing.module';
import { DutyRosterDutyConfigComponent } from './duty-config/duty-config.component';
import { DutyRosterDutyConfigEditComponent } from './duty-config/edit/edit.component';
import { DutyRosterDutyConfigViewComponent } from './duty-config/view/view.component';

const COMPONENTS = [
  DutyRosterDutyConfigComponent];
const COMPONENTS_NOROUNT = [
  DutyRosterDutyConfigEditComponent,
  DutyRosterDutyConfigViewComponent];

@NgModule({
  imports: [
    SharedModule,
    DutyRosterRoutingModule
  ],
  declarations: [
    ...COMPONENTS,
    ...COMPONENTS_NOROUNT
  ],
  entryComponents: COMPONENTS_NOROUNT
})
export class DutyRosterModule { }
