import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { Module } from '../module.model';
import { ModuleService } from '../module.service';

@Component({
  selector: 'app-module-list-item',
  templateUrl: './module-list-item.component.html',
  styleUrls: ['./module-list-item.component.scss']
})
export class ModuleListItemComponent implements OnInit, OnDestroy {
  public module: Module;
  private moduleInfoSub: Subscription;
  public isInfoLoading = false;
  public progress = 0;
  public updateProgress = 0;
  public response: string;
  @Output() deleted = new EventEmitter<string>();

  @Input()
  set _module(module: Module) {
    this.module = module;
    this.getModuleInfo();
  }

  constructor(private moduleService: ModuleService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.moduleService.getUpdateProgress(this.module).subscribe((data) => {
      this.updateProgress = JSON.parse(data.data).progress;
    });
    this.moduleInfoSub = this.moduleService.getModuleInfoUpdateListener().subscribe((moduleInfo: { module: Module }) => {
      if (this.module?.id !== moduleInfo.module.id) { return; }
      this.isInfoLoading = false;
      this.module = Object.assign(this.module, moduleInfo.module);
    });
  }

  getModuleInfo(): void {
    this.isInfoLoading = true;
    this.moduleService.getModuleInfo(this.module.id);
  }

  onUploadUpdate(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.moduleService.updateModuleFirmware(this.module, file).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.UploadProgress:
          this.progress = Math.round(event.loaded / event.total * 100);
          break;
        case HttpEventType.Response:
          this.response = event.body.message;
          break;
      }
    }, (error) => {
      this.response = error.error.message;
    });
  }

  open(content) {
    this.modalService.open(content, { ariaLabelledBy: 'firmware-update-modal' }).result.then(() => {

    }, () => {
      this.progress = 0;
      this.updateProgress = 0;
      this.response = null;
    });
  }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  deleteModule(id: string) {
    this.moduleService.deleteModule(id);
    this.delay(100).then(() => {
      this.deleted.emit();
    });
  }

  ngOnDestroy(): void {
    this.moduleInfoSub?.unsubscribe();
  }
}
