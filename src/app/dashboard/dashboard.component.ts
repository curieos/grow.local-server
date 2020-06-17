import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Plant } from '../plant/plant.model';
import { PlantsService } from '../plant/plants.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  public isLoading = false;
  private plantSub: Subscription;
  private plantInfoSub: Subscription;
  public plantList: Plant[];
  public selectedPlant: Plant;

  multi: Array<{ name: string, series: Array<{ name: Date, value: number }> }>;
  showLabels = true;
  animations = true;
  xAxis = true;
  yAxis = true;
  showXAxisLabel = true;
  xAxisLabel = 'Time';
  timeline = true;

  colorScheme = {
    domain: ['rgba(1,50,220,0.4)', '#rgba(120,8,9,0.4)']
  };

  constructor(private plantsService: PlantsService) { }

  ngOnInit() {
    this.isLoading = true;
    this.plantsService.getPlants();
    this.plantSub = this.plantsService.getPlantsUpdateListener().subscribe((plantData: { plants: Plant[] }) => {
      this.isLoading = false;
      this.plantList = plantData.plants;
      if (this.plantList) {
        this.selectedPlant = this.plantList[0];
        this.getPlantInfo(this.plantList[0]);
      }
    });
  }

  getPlantInfo(plant: Plant) {
    if (!plant) { return; }
    this.plantsService.getPlantInfo(plant.id);
    this.plantInfoSub = this.plantsService.getPlantInfoUpdateListener().subscribe((plantInfo: { plant: Plant }) => {
      if (plant.id !== plantInfo.plant.id) { return; }
      plant = Object.assign(plant, plantInfo.plant);
      this.selectedPlant = plant;
      this.multi = [Plant.getChartData(plant.humidityHistory, 'Humidity')];
      if (plant.soilMoistureHistory) {
        this.multi.push(Plant.getChartData(plant.soilMoistureHistory, 'Soil Moisture'));
      }
    });
  }

  ngOnDestroy() {
    this.plantSub?.unsubscribe();
    this.plantInfoSub?.unsubscribe();
  }
}
