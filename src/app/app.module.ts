import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorInterceptor } from './error.interceptor';
import { HeaderComponent } from './header/header.component';
import { ModuleEditComponent } from './module/module-edit/module-edit.component';
import { ModuleLinkComponent } from './module/module-link/module-link.component';
import { ModuleListComponent } from './module/module-list/module-list.component';
import { PlantCreateComponent } from './plant/plant-create/plant-create.component';
import { PlantEditComponent } from './plant/plant-edit/plant-edit.component';
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
  ],
  imports: [
    NgbModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ChartsModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [
    AppComponent,
  ],
})
export class AppModule { }
