import { Component, OnInit } from '@angular/core';
import { PlantsService } from '../plants.service';
import { Subscription } from 'rxjs';
import { Plant } from '../plant.model';

@Component({
  selector: 'app-plant-list',
  templateUrl: './plant-list.component.html',
  styleUrls: ['./plant-list.component.css']
})
export class PlantListComponent implements OnInit {
  public isLoading = false;
  private plantSub: Subscription;
  public plantList: Plant[];

  constructor(private plantsService: PlantsService) { }

  ngOnInit() {
    this.isLoading = true;
    this.plantsService.getPlants();
    this.plantSub = this.plantsService.getPlantsUpdateListener().subscribe((plantData: { plants: Plant[] }) => {
      this.isLoading = false;
      this.plantList = plantData.plants;
    });
  }

  fixName(name: string) {
    const split = name.split(' ');
    return split.join('-');
  }

}
