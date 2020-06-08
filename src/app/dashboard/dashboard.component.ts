import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { Plant } from '../plant/plant.model';
import { PlantsService } from '../plant/plants.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public isLoading = false;
  private plantSub: Subscription;
  private plantInfoSub: Subscription;
  public plantList: Plant[];
  public selectedPlant: Plant;

  // chart bs, temporary
  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Humidity', yAxisID: 'humidity' },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          display: 'auto',
          id: 'humidity',
          position: 'left',
          ticks: { suggestedMin: 40, suggestedMax: 60 },
        },
        {
          display: 'auto',
          id: 'moisture',
          position: 'right',
          ticks: { suggestedMin: 40, suggestedMax: 60 },
        },
      ],
    },
  };
  public lineChartColors: Color[] = [
    {
      backgroundColor: 'rgba(1,50,220,0.2)',
      borderColor: 'rgba(1,50,220,1)',
      pointBackgroundColor: 'rgba(1,15,220,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(1,50,220,0.8)',
    },
    {
      backgroundColor: 'rgba(120,8,9,0.2)',
      borderColor: 'rgba(120,8,9,1)',
      pointBackgroundColor: 'rgba(120,8,9,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(120,8,9,1)',
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
      this.getPlantInfo(this.plantList[0]);
    });
  }

  getPlantInfo(plant: Plant) {
    this.plantsService.getPlantInfo(plant.id);
    this.plantInfoSub = this.plantsService.getPlantInfoUpdateListener().subscribe((plantInfo: { plant: Plant }) => {
      plant = Object.assign(plant, plantInfo.plant);
      this.lineChartData = [Plant.getChartData(plant.humidityHistory, 'Humidity')];
      if (plant.soilMoistureHistory) {
        this.lineChartData.push(Plant.getChartData(plant.soilMoistureHistory, 'Soil Moisture'));
      }
      this.lineChartLabels = Plant.getPlantHistoryTimestamp(plant.humidityHistory);
    });
  }

  ngOnDestroy() {
    this.plantSub.unsubscribe();
    if (this.plantInfoSub) {
      this.plantInfoSub.unsubscribe();
    }
  }
}
