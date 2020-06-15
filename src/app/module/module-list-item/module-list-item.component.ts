import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Module } from '../module.model';
import { ModulesService } from '../modules.service';

@Component({
  selector: 'app-module-list-item',
  templateUrl: './module-list-item.component.html',
  styleUrls: ['./module-list-item.component.scss']
})
export class ModuleListItemComponent implements OnInit, OnDestroy {
  public module: Module;
  private moduleInfoSub: Subscription;
  public isInfoLoading = false;
  @Output() deleted = new EventEmitter<string>();

  @Input()
  set _module(module: Module) {
    this.module = module;
    this.getModuleInfo();
  }

  constructor(private modulesService: ModulesService) { }

  ngOnInit(): void { }

  getModuleInfo(): void {
    this.isInfoLoading = true;
    this.modulesService.getModuleInfo(this.module.id);
    this.moduleInfoSub = this.modulesService.getModuleInfoUpdateListener().subscribe((moduleInfo: {module: Module}) => {
      if (this.module?.id !== moduleInfo.module.id) { return; }
      this.isInfoLoading = false;
      this.module = Object.assign(this.module, moduleInfo.module);
    });
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  deleteModule(id: string) {
    this.modulesService.deleteModule(id);
    this.delay(100).then(() => {
      this.deleted.emit();
    });
  }

  ngOnDestroy(): void {
    this.moduleInfoSub?.unsubscribe();
  }
}
