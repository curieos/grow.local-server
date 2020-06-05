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
    { data: [], label: 'Temperature'},
  ];
  public lineChartLabels: Label[] = [];
  public lineChartOptions: (ChartOptions) = {
    responsive: true,
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      xAxes: [{}],
      yAxes: [
        {
          id: 'temperature',
          position: 'right',
          ticks: { suggestedMin: 10, suggestedMax: 40 },
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
      plant = plantInfo.plant;
      this.lineChartData = this.getChartData(plant.temperatureHistory, 'Temperature');
      this.lineChartLabels = this.getPlantHistoryTimestamp(plant.temperatureHistory);
    });
  }

  setChartTo(data: [{value: number, time: string}], label: string) {
    this.lineChartData = this.getChartData(data, label);
    this.lineChartLabels = this.getPlantHistoryTimestamp(data);
  }

  getAverage(data: [{value: number, time: string}]) {
    let avg = 0;
    for (const dataPoint of data) {
      avg += dataPoint.value;
    }
    avg /= data.length;
    return avg;
  }

  getChartData(data: [{value: number, time: string}], label: string) {
    const newData = [{ data: [], label}];
    for (const dataPoint of data) {
      newData[0].data.push(dataPoint.value);
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

  deletePlant(id: string) {
    this.isLoading = true;
    this.plantsService.deletePlant(id);
    this.delay(500).then(() =>
      this.getPlants(),
    );
  }

  ngOnDestroy() {
    this.plantSub.unsubscribe();
  }
}
