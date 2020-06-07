import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Plant } from '../plant.model';
import { PlantsService } from '../plants.service';

@Component({
  selector: 'app-plant-edit',
  templateUrl: './plant-edit.component.html',
  styleUrls: ['./plant-edit.component.scss']
})
export class PlantEditComponent implements OnInit, OnDestroy {
  public isLoading = false;
  private plantInfoSub: Subscription;
  public plant: Plant;

  constructor(private plantsService: PlantsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getPlantInfo();
  }

  getPlantInfo() {
    this.isLoading = true;
    this.plantsService.getPlantInfo(this.route.snapshot.params['id']);
    this.plantInfoSub = this.plantsService.getPlantInfoUpdateListener().subscribe((plantInfo: {plant: Plant}) => {
      this.isLoading = false;
      this.plant = plantInfo.plant;
    });
  }

  ngOnDestroy(): void {
    this.plantInfoSub.unsubscribe();
  }

}
