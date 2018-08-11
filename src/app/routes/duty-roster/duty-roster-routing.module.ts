import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DutyRosterConfigComponent } from './config/config.component';
import { DutyRosterComponent } from './duty-roster/duty-roster.component';
import { DutyRosterHolidaysComponent } from './holidays/holidays.component';
const routes: Routes = [
  {path:'config',component: DutyRosterConfigComponent}
,
  { path: 'view', component: DutyRosterComponent },
  { path: 'holidays', component: DutyRosterHolidaysComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DutyRosterRoutingModule { }
