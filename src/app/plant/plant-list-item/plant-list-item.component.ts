import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Plant } from '../plant.model';
import { PlantService } from '../plant.service';

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

  multi: Array<{ name: string, series: Array<{ name: Date, value: number }> }>;
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showYAxisLabel = true;
  showXAxisLabel = true;
  xAxisLabel = 'Time';
  yAxisLabel = 'Temperature';
  timeline = true;

  colorScheme = {
    domain: ['rgba(1,50,220,0.4)']
  };

  @Input()
  set _plant(plant: Plant) {
    this.plant = plant;
    this.getPlantInfo();
  }

  constructor(private plantsService: PlantService) { }

  ngOnInit(): void { }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  getPlantInfo() {
    this.isInfoLoading = true;
    this.plantsService.getPlantInfo(this.plant.id);
    this.plantInfoSub = this.plantsService.getPlantInfoUpdateListener().subscribe((plantInfo: { plant: Plant }) => {
      if (this.plant?.id !== plantInfo.plant.id) return;
      this.isInfoLoading = false;
      this.plant = Object.assign(this.plant, plantInfo.plant);
      this.multi = [Plant.getChartData(this.plant.temperatureHistory, 'Temperature')];
      this.yAxisLabel = 'Temperature';
    });
  }

  setChartTo(data: Array<{ value: number, time: string }>, label: string) {
    this.multi = [Plant.getChartData(data, label)];
    this.yAxisLabel = label;
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
