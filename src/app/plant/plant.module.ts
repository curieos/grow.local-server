import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { SharedModule } from '../shared/shared.module';
import { PlantCreateComponent } from './plant-create/plant-create.component';
import { PlantEditComponent } from './plant-edit/plant-edit.component';
import { PlantListItemComponent } from './plant-list-item/plant-list-item.component';
import { PlantListComponent } from './plant-list/plant-list.component';

const routes: Routes = [
  { path: 'plants', component: PlantListComponent },
  { path: 'plants/create', component: PlantCreateComponent },
  { path: 'plants/:id/edit', component: PlantEditComponent },
];

@NgModule({
  declarations: [
    PlantListComponent,
    PlantCreateComponent,
    PlantEditComponent,
    PlantListItemComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    NgxChartsModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class PlantModule { }
