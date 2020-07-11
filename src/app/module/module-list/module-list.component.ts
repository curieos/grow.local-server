import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Module } from '../module.model';
import { ModuleService } from '../module.service';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.css'],
})
export class ModuleListComponent implements OnInit, OnDestroy {
  public isLoading = false;
  public isInfoLoading = false;
  private moduleSub: Subscription;
  public moduleList: Module[];

  constructor(private modulesService: ModuleService) { }

  ngOnInit() {
    this.moduleSub = this.modulesService.getModulesUpdateListener().subscribe((moduleData: { modules: Module[] }) => {
      this.isLoading = false;
      this.moduleList = moduleData.modules;
    });
    this.getModules();
  }

  getModules() {
    this.isLoading = true;
    this.modulesService.getModules();
  }

  ngOnDestroy() {
    this.moduleSub?.unsubscribe();
  }
}
