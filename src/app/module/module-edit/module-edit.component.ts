import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Module } from '../module.model';
import { ModulesService } from '../modules.service';

@Component({
  selector: 'app-module-edit',
  templateUrl: './module-edit.component.html',
  styleUrls: ['./module-edit.component.scss'],
})
export class ModuleEditComponent implements OnInit, OnDestroy {
  public isLoading = false;
  public isUpdateLoading = false;
  public form: FormGroup;
  private moduleSettingsSubscription: Subscription;
  public module: Module;

  constructor(private modulesService: ModulesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl('', { validators: [Validators.required, Validators.minLength(4)] }),
    });
    this.getModuleSettings();
  }

  getModuleSettings() {
    if (!this.route.snapshot.params['id']) {
      return;
    }
    this.isLoading = true;
    this.modulesService.getModuleSettings(this.route.snapshot.params['id']);
    this.moduleSettingsSubscription = this.modulesService.getModuleSettingsUpdateListener().subscribe((module: {module: Module}) => {
      this.isLoading = false;
      this.module = module.module;
      this.updateForm();
    });
  }

  updateForm() {
    this.form.get('name').setValue(this.module.name);
    this.form.updateValueAndValidity();
  }

  updateModule() {
    this.module.name = this.form.get('name').value;
  }

  updateModuleSettings() {
    if (this.form.invalid) { return; }
    this.updateModule();
    this.modulesService.updateModuleSettings(this.module);
    this.isUpdateLoading = true;
    this.form.reset();
  }

  ngOnDestroy(): void {
    this.moduleSettingsSubscription?.unsubscribe();
  }
}
