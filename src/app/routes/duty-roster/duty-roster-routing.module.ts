import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DutyRosterConfigComponent } from './config/config.component';
import { DutyRosterComponent } from './duty-roster/duty-roster.component';
const routes: Routes = [
  {path:'config',component: DutyRosterConfigComponent}
,
  { path: 'view', component: DutyRosterComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DutyRosterRoutingModule { }
