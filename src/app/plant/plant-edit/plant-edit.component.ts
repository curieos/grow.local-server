import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Plant } from '../plant.model';
import { PlantsService } from '../plants.service';

@Component({
  selector: 'app-plant-edit',
  templateUrl: './plant-edit.component.html',
  styleUrls: ['./plant-edit.component.scss'],
})
export class PlantEditComponent implements OnInit, OnDestroy {
  public isLoading = false;
  public isUpdateLoading = false;
  public form: FormGroup;
  private plantSettingsSub: Subscription;
  public plant: Plant;

  constructor(private plantsService: PlantsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', { validators: [Validators.required, Validators.minLength(4)] }),
    });
    this.getPlantSettings();
  }

  getPlantSettings() {
    if (!this.route.snapshot.params['id']) {
      return;
    }
    this.isLoading = true;
    this.plantsService.getPlantSettings(this.route.snapshot.params['id']);
    this.plantSettingsSub = this.plantsService.getPlantSettingsUpdateListener().subscribe((plant: {plant: Plant}) => {
      this.isLoading = false;
      this.plant = plant.plant;
      this.updateForm();
    });
  }

  updateForm() {
    this.form.get('name').setValue(this.plant.name);
    this.form.updateValueAndValidity();
  }

  updatePlant() {
    this.plant.name = this.form.get('name').value;
  }

  updatePlantSettings() {
    if (this.form.invalid) { return; }
    this.updatePlant();
    this.plantsService.updatePlantSettings(this.plant);
    this.isUpdateLoading = true;
    this.form.reset();
  }

  ngOnDestroy(): void {
    this.plantSettingsSub.unsubscribe();
  }

}
