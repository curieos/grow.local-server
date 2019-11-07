import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlantCreateComponent } from './plant/plant-create/plant-create.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PlantListComponent } from './plant/plant-list/plant-list.component';
import { ModuleListComponent } from './module/module-list/module-list.component';
import { ModuleLinkComponent } from './module/module-link/module-link.component';
import { ChartsModule } from "ng2-charts";
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    PlantCreateComponent,
    HeaderComponent,
    DashboardComponent,
    PlantListComponent,
    ModuleListComponent,
    ModuleLinkComponent,
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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
