import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Module } from 'src/app/module/module.model';
import { ModuleService } from 'src/app/module/module.service';
import { PlantService } from '../plant.service';

@Component({
  selector: 'app-plant-create',
  templateUrl: './plant-create.component.html',
  styleUrls: ['./plant-create.component.css'],
})
export class PlantCreateComponent implements OnInit, OnDestroy {
  isLoading = false;
  form: FormGroup;
  public moduleList: Module[] = [];
  private moduleSub: Subscription;

  constructor(public plantsService: PlantService, public modulesService: ModuleService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl('', { validators: [Validators.required, Validators.minLength(4)] }),
      module: new FormControl(null, { validators: [Validators.required] }),
      control_watering: new FormControl(false, {validators: [Validators.required]}),
      use_moisture_sensor: new FormControl(false, {validators: [Validators.required]}),
      watering_interval: new FormControl({ hour: 12, minute: 0 }, { validators: [Validators.required] }),
      moisture_level: new FormControl(0, { validators: [Validators.required, Validators.min(0)] }),
    });
    this.getModules();
  }

  getModules() {
    this.isLoading = true;
    this.modulesService.getModules();
    this.moduleSub = this.modulesService.getModulesUpdateListener().subscribe((moduleData: { modules: Module[] }) => {
      this.isLoading = false;
      this.moduleList = moduleData.modules;
    });
  }

  onSavePlant() {
    if (this.form.invalid) { return; }
    this.plantsService.addNewPlant(this.form.value.name, this.form.value.module.name);
    this.isLoading = true;
    this.form.reset();
  }

  ngOnDestroy() {
    this.moduleSub?.unsubscribe();
  }

}
