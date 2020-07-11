import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { ModuleEditComponent } from './module-edit/module-edit.component';
import { ModuleLinkComponent } from './module-link/module-link.component';
import { ModuleListItemComponent } from './module-list-item/module-list-item.component';
import { ModuleListComponent } from './module-list/module-list.component';

const routes: Routes = [
  { path: 'modules', component: ModuleListComponent },
  { path: 'modules/link', component: ModuleLinkComponent },
  { path: 'modules/:id/edit', component: ModuleEditComponent },
];

@NgModule({
  declarations: [
    ModuleEditComponent,
    ModuleLinkComponent,
    ModuleListComponent,
    ModuleListItemComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class ModuleModule { }
