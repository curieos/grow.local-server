import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlantsService } from '../plants.service';

@Component({
  selector: 'app-plant-create',
  templateUrl: './plant-create.component.html',
  styleUrls: ['./plant-create.component.css']
})
export class PlantCreateComponent implements OnInit {
  isLoading = false;
  form: FormGroup;

  constructor(public plantsService: PlantsService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required, Validators.minLength(4)] }),
      module: new FormControl(null, { validators: [Validators.required] }),
      watering_time: new FormControl({ hour: 12, minute: 0 }, { validators: [Validators.required] }),
    });
  }

  onSavePlant() {
    if (this.form.invalid) return;
    this.plantsService.addNewPlant(this.form.value.name, this.form.value.module);
    this.isLoading = true;
    this.form.reset();
  }

}
