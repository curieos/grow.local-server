import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { Plant } from '../plant.model';
import { PlantsService } from '../plants.service';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css'],
})
export class PlantListComponent implements OnInit, OnDestroy {
  public isLoading = false;
  public isInfoLoading = false;
  private plantSub: Subscription;
  private plantInfoSub: Subscription;
  public plantList: Plant[];

  public lineChartData: ChartDataSets[] = [
    { data: [], label: 'Temperature', yAxisID: 'temperature' },
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
          id: 'temperature',
          position: 'right',
          ticks: { suggestedMin: 10, suggestedMax: 40 },
        },
        {
          display: 'auto',
          id: 'humidity',
          position: 'right',
          ticks: { suggestedMin: 10, suggestedMax: 40 },
        },
        {
          display: 'auto',
          id: 'soilMoisture',
          position: 'right',
          ticks: { suggestedMin: 500, suggestedMax: 800 },
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
  ];
  public lineChartLegend = true;
  public lineChartType = 'line';

  constructor(private plantsService: PlantsService) { }

  ngOnInit() {
    this.getPlants();
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  getPlants() {
    this.isLoading = true;
    this.plantsService.getPlants();
    this.plantSub = this.plantsService.getPlantsUpdateListener().subscribe((plantData: { plants: Plant[] }) => {
      this.isLoading = false;
      this.plantList = plantData.plants;
    });
  }

  getPlantInfo(plant: Plant) {
    this.isInfoLoading = true;
    this.plantsService.getPlantInfo(plant.id);
    this.plantInfoSub = this.plantsService.getPlantInfoUpdateListener().subscribe((plantInfo: {plant: Plant}) => {
      this.isInfoLoading = false;
      plant = Object.assign(plant, plantInfo.plant);
      this.lineChartData = [ Plant.getChartData(plant.temperatureHistory, 'Temperature') ];
      this.lineChartLabels = Plant.getPlantHistoryTimestamp(plant.temperatureHistory);
    });
  }

  setChartTo(data: Array<{ value: number, time: string }>, label: string) {
    this.lineChartData = [ Plant.getChartData(data, label) ];
    this.lineChartLabels = Plant.getPlantHistoryTimestamp(data);
  }

  deletePlant(id: string) {
    this.isLoading = true;
    this.plantsService.deletePlant(id);
    this.delay(500).then(() =>
      this.getPlants(),
    );
  }

  ngOnDestroy() {
    this.plantSub?.unsubscribe();
    this.plantInfoSub?.unsubscribe();
  }
}
