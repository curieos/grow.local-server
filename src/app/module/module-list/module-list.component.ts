import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Module } from '../module.model';
import { ModulesService } from '../modules.service';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.css'],
})
export class ModuleListComponent implements OnInit, OnDestroy {
  public isLoading = false;
  public isInfoLoading = false;
  private moduleSub: Subscription;
  private moduleInfoSub: Subscription;
  public moduleList: Module[];

  constructor(private modulesService: ModulesService) { }

  ngOnInit() {
    this.getModules();
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  getModules() {
    this.isLoading = true;
    this.modulesService.getModules();
    this.moduleSub = this.modulesService.getModulesUpdateListener().subscribe((moduleData: { modules: Module[] }) => {
      this.isLoading = false;
      this.moduleList = moduleData.modules;
    });
  }

  getModuleInfo(module: Module) {
    this.isInfoLoading = true;
    this.modulesService.getModuleInfo(module.id);
    this.moduleInfoSub = this.modulesService.getModuleInfoUpdateListener().subscribe((moduleInfo: {module: Module}) => {
      this.isInfoLoading = false;
      module = Object.assign(module, moduleInfo.module);
    });
  }

  deleteModule(id: string) {
    this.isLoading = true;
    this.modulesService.deleteModule(id);
    this.delay(500).then(() =>
      this.getModules(),
    );
  }

  ngOnDestroy() {
    this.moduleSub?.unsubscribe();
    this.moduleInfoSub?.unsubscribe();
  }
}
