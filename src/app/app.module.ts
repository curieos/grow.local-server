import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorInterceptor } from './error.interceptor';
import { HeaderComponent } from './header/header.component';
import { ListViewComponent } from './list-view/list-view.component';
import { ModuleEditComponent } from './module/module-edit/module-edit.component';
import { ModuleLinkComponent } from './module/module-link/module-link.component';
import { ModuleListItemComponent } from './module/module-list-item/module-list-item.component';
import { ModuleListComponent } from './module/module-list/module-list.component';
import { PlantCreateComponent } from './plant/plant-create/plant-create.component';
import { PlantEditComponent } from './plant/plant-edit/plant-edit.component';
import { PlantListItemComponent } from './plant/plant-list-item/plant-list-item.component';
import { PlantListComponent } from './plant/plant-list/plant-list.component';

@NgModule({
  declarations: [
    AppComponent,
    PlantCreateComponent,
    HeaderComponent,
    DashboardComponent,
    PlantListComponent,
    ModuleListComponent,
    ModuleLinkComponent,
    PlantEditComponent,
    ModuleEditComponent,
    ListViewComponent,
    PlantListItemComponent,
    ModuleListItemComponent,
  ],
  imports: [
    NgbModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    NgxChartsModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
