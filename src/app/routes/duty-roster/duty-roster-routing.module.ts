import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DutyRosterDutyConfigComponent } from './duty-config/duty-config.component';

const routes: Routes = [

  { path: 'duty-config', component: DutyRosterDutyConfigComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DutyRosterRoutingModule { }
