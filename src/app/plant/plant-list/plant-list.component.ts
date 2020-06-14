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
  public plants: Plant[];
  public plantList: Plant[];
  public model: any;

  readonly search = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    map(term => term === '' ? [] : this.plantList.filter(v => v.name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 10))
  );

  formatter = (x: { name: string }) => x.name;

  constructor(private plantsService: PlantsService) { }

  ngOnInit() {
    this.getPlants();
  }

  getPlantsByName(name: string) {
    return this.plants.filter(v => v.name.toLowerCase().indexOf(name.toLowerCase()) > -1);
  }

  getPlants() {
    console.log(this.search);
    this.isLoading = true;
    this.plantsService.getPlants();
    this.plantSub = this.plantsService.getPlantsUpdateListener().subscribe((plantData: { plants: Plant[] }) => {
      this.isLoading = false;
      this.plants = plantData.plants;
      this.plantList = this.plants;
    });
  }

  ngOnDestroy() {
    this.plantSub?.unsubscribe();
  }
}
