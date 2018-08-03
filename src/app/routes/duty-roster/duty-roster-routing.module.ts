import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DutyRosterConfigComponent } from './config/config.component';
const routes: Routes = [
  {path:'config',component: DutyRosterConfigComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DutyRosterRoutingModule { }
