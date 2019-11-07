import { Component, OnInit, OnDestroy } from '@angular/core';
import { ModulesService } from '../modules.service';
import { Subscription } from 'rxjs';
import { Module } from '../module.model';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.css']
})
export class ModuleListComponent implements OnInit, OnDestroy {
  public isLoading = false;
  private moduleSub: Subscription;
  public moduleList: Module[];

  constructor(private modulesService: ModulesService) { }

  ngOnInit() {
    this.getModules();
  }
  
  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  getModules() {
    this.isLoading = true;
    this.modulesService.getModules();
    this.moduleSub = this.modulesService.getModulesUpdateListener().subscribe((moduleData: { modules: Module[] }) => {
      this.isLoading = false;
      this.moduleList = moduleData.modules;
    });
  }

  deleteModule(id: string) {
    this.isLoading = true;
    this.modulesService.deleteModule(id);
    this.delay(500).then(() =>
      this.getModules()
    );
  }

  ngOnDestroy() {
    this.moduleSub.unsubscribe();
  }
}
