import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';
import { Plant } from '../plant.model';
import { PlantsService } from '../plants.service';

@Component({
  selector: 'app-plant-view',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css'],
})
export class PlantListComponent implements OnInit, OnDestroy {
  public isLoading = false;
  private plantSub: Subscription;
  public plantList: Plant[];

  constructor(private plantsService: PlantsService) { }

  ngOnInit() {
    this.getPlants();
  }

  getPlants() {
    this.isLoading = true;
    this.plantsService.getPlants();
    this.plantSub = this.plantsService.getPlantsUpdateListener().subscribe((plantData: { plants: Plant[] }) => {
      this.isLoading = false;
      this.plantList = plantData.plants;
    });
  }

  ngOnDestroy() {
    this.plantSub?.unsubscribe();
  }
}
