import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlantCreateComponent } from './plant/plant-create/plant-create.component';

const routes: Routes = [
  { path: 'plants/create', component: PlantCreateComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
