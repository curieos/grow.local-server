import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlantCreateComponent } from './plant/plant-create/plant-create.component';
import { PlantListComponent } from './plant/plant-list/plant-list.component';
import { ModuleLinkComponent } from './module/module-link/module-link.component';
import { ModuleListComponent } from './module/module-list/module-list.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'plants', component: PlantListComponent },
  { path: 'plants/create', component: PlantCreateComponent },
  { path: 'modules', component: ModuleListComponent },
  { path: 'modules/link', component: ModuleLinkComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
