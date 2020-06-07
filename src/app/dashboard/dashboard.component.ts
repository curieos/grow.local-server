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
    { data: [], label: 'Soil Moisture', yAxisID: 'moisture' },
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'humidity',
          position: 'left',
          ticks: { suggestedMin: 40, suggestedMax: 60 },
        },
        {
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
    this.plantInfoSub = this.plantsService.getPlantInfoUpdateListener().subscribe((plantInfo: {plant: Plant}) => {
      plant = plantInfo.plant;
      this.lineChartData = this.getChartData(plant);
      this.lineChartLabels = this.getPlantHistoryTimestamp(plant.humidityHistory);
    });
  }

  getChartData(plant: Plant) {
    const newData = [{ data: [], label: 'Humidity', yAxisID: 'humidity'}];
    for (const dataPoint of plant.humidityHistory) {
      newData[0].data.push(dataPoint.value);
    }
    if (plant.soilMoistureHistory) {
      const moistureData = [];
      for (const dataPoint of plant.soilMoistureHistory) {
        moistureData.push(dataPoint.value);
      }
      newData.push({data: moistureData, label: 'Soil Moisture', yAxisID: 'moisture'});
    }
    return newData;
  }

  getPlantHistoryTimestamp(data: [{value: number, time: string}]) {
    const label = [];
    for (const dataPoint of data) {
      label.push(dataPoint.time.slice(0, 5));
    }
    return label;
  }

  ngOnDestroy() {
    this.plantSub.unsubscribe();
    if (this.plantInfoSub) {
      this.plantInfoSub.unsubscribe();
    }
  }

}
