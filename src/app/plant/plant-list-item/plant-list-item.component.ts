import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { Subscription } from 'rxjs';
import { Plant } from '../plant.model';
import { PlantsService } from '../plants.service';

@Component({
  selector: 'app-plant-list-item',
  templateUrl: './plant-list-item.component.html',
  styleUrls: ['./plant-list-item.component.scss']
})
export class PlantListItemComponent implements OnInit, OnDestroy {
  public plant: Plant;
  public isInfoLoading = false;
  private plantInfoSub: Subscription;
  @Output() deleted = new EventEmitter<string>();

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

@Input()
  set _plant(plant: Plant) {
    this.plant = plant;
    this.getPlantInfo();
  }

  constructor(private plantsService: PlantsService) { }

  ngOnInit(): void { }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  getPlantInfo() {
    this.isInfoLoading = true;
    this.plantsService.getPlantInfo(this.plant.id);
    this.plantInfoSub = this.plantsService.getPlantInfoUpdateListener().subscribe((plantInfo: { plant: Plant }) => {
      if (this.plant?.id !== plantInfo.plant.id) { return; }
      this.isInfoLoading = false;
      this.plant = Object.assign(this.plant, plantInfo.plant);
      this.lineChartData = [Plant.getChartData(this.plant.temperatureHistory, 'Temperature')];
      this.lineChartLabels = Plant.getPlantHistoryTimestamp(this.plant.temperatureHistory);
    });
  }

  setChartTo(data: Array<{ value: number, time: string }>, label: string) {
    this.lineChartData = [Plant.getChartData(data, label)];
    this.lineChartLabels = Plant.getPlantHistoryTimestamp(data);
  }

  deletePlant(id: string) {
    this.plantsService.deletePlant(id);
    this.delay(100).then(() => {
      this.deleted.emit();
    });
  }

  ngOnDestroy(): void {
    this.plantInfoSub?.unsubscribe();
  }
}
