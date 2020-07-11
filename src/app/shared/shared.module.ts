import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ListViewComponent } from './list-view/list-view.component';
import { MultiAxisChartComponent } from './multi-axis-chart/multi-axis-chart.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    ListViewComponent,
    MultiAxisChartComponent,
  ],
  imports: [
    NgbModule,
    CommonModule,
    NgxChartsModule,
    BrowserAnimationsModule,
  ],
  exports: [
    ListViewComponent,
    MultiAxisChartComponent,
  ]
})
export class SharedModule { }
