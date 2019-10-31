import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { PlantsService } from '../plant/plants.service';
import { Subscription } from 'rxjs';
import { Plant } from '../plant/plant.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public isLoading = false;
  private plantSub: Subscription;
  public plantList: Plant[];

  // chart bs, temporary
  public lineChartData: ChartDataSets[] = [
    { data: [7, 6.7, 6.8, 6.5, 6.7, 6.9, 7.2], label: 'Soil ph' },
    { data: [70, 67, 64, 63, 62, 80, 90], label: 'Soil Moisture', yAxisID: 'moisture' },
  ];
  public lineChartLabels: Label[] = ['7:00', '9:00', '11:00', '13:00', '15:00', '17:00', '19:00'];
  public lineChartOptions: (ChartOptions) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'ph',
          position: 'left',
          ticks: { beginAtZero: true, suggestedMax: 14 }
        },
        {
          id: 'moisture',
          position: 'right',
          ticks: { beginAtZero: true, suggestedMax: 100 }
        }
      ]
    },
  };
  public lineChartColors: Color[] = [
    { // grey
      backgroundColor: 'rgba(120,8,9,0.2)',
      borderColor: 'rgba(120,8,9,1)',
      pointBackgroundColor: 'rgba(120,8,9,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(120,8,9,1)'
    },
    { // dark grey
      backgroundColor: 'rgba(1,50,220,0.2)',
      borderColor: 'rgba(1,50,220,1)',
      pointBackgroundColor: 'rgba(1,15,220,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(1,50,220,0.8)'
    },
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';
  // end chart bs

  constructor(private plantsService: PlantsService) { }

  ngOnInit() {
    this.isLoading = true;
    this.plantsService.getPlants();
    this.plantSub = this.plantsService.getPlantsUpdateListener().subscribe((plantData: { plants: Plant[] }) => {
      this.isLoading = false;
      this.plantList = plantData.plants;
    });
  }

  ngOnDestroy() {

  }

}
