import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DutyRosterRoutingModule } from './duty-roster-routing.module';
import { DutyRosterConfigComponent } from './config/config.component';
import { DutyRosterConfigEditComponent } from './config/edit/edit.component';
import { DutyRosterConfigViewComponent } from './config/view/view.component';


const COMPONENTS = [

  DutyRosterConfigComponent];
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
  entryComponents: COMPONENTS_NOROUNT
})
export class DutyRosterModule { }
