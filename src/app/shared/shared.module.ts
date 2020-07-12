import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { ListViewComponent } from './list-view/list-view.component';
import { MultiAxisChartComponent } from './multi-axis-chart/multi-axis-chart.component';

@NgModule({
  declarations: [
    ListViewComponent,
    MultiAxisChartComponent,
  ],
  imports: [
    NgbModule,
    CommonModule,
    NgxChartsModule,
    FormsModule,
    BrowserAnimationsModule,
  ],
  exports: [
    ListViewComponent,
    MultiAxisChartComponent,
  ]
})
export class SharedModule { }
