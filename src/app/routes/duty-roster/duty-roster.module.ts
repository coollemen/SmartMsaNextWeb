import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { DutyRosterRoutingModule } from './duty-roster-routing.module';

const COMPONENTS = [];
const COMPONENTS_NOROUNT = [];

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
