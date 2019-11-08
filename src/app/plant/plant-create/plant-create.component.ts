import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PlantsService } from '../plants.service';
import { ModulesService } from 'src/app/module/modules.service';
import { Module } from 'src/app/module/module.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-plant-create',
  templateUrl: './plant-create.component.html',
  styleUrls: ['./plant-create.component.css']
})
export class PlantCreateComponent implements OnInit {
  isLoading = false;
  form: FormGroup;
  public moduleList: Module[] = [];
  private moduleSub: Subscription;

  constructor(public plantsService: PlantsService, public modulesService: ModulesService) { }

  ngOnInit() {
    this.form = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required, Validators.minLength(4)] }),
      module: new FormControl(null, { validators: [Validators.required] }),
      watering_time: new FormControl({ hour: 12, minute: 0 }, { validators: [Validators.required] }),
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
    if (this.form.invalid) return;
    console.log(this.form.value.module);
    this.plantsService.addNewPlant(this.form.value.name, this.form.value.module.name);
    this.isLoading = true;
    this.form.reset();
  }

  ngOnDestroy() {
    this.moduleSub.unsubscribe();
  }

}
