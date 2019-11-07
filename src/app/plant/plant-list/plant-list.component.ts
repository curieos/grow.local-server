import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlantsService } from '../plants.service';
import { Subscription } from 'rxjs';
import { Plant } from '../plant.model';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css']
})
export class PlantListComponent implements OnInit, OnDestroy {
  public isLoading = false;
  private plantSub: Subscription;
  public plantList: Plant[];

  constructor(private plantsService: PlantsService) { }

  ngOnInit() {
    this.getPlants();
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getPlants() {
    this.isLoading = true;
    this.plantsService.getPlants();
    this.plantSub = this.plantsService.getPlantsUpdateListener().subscribe((plantData: { plants: Plant[] }) => {
      this.isLoading = false;
      this.plantList = plantData.plants;
    });
  }

  deletePlant(id: string) {
    this.isLoading = true;
    this.plantsService.deletePlant(id);
    this.delay(500).then(() =>
      this.getPlants()
    );
  }

  ngOnDestroy() {
    this.plantSub.unsubscribe();
  }
}
