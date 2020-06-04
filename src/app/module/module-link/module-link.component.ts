import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ModulesService } from '../modules.service';
import { RawModule } from '../rawmodule.model';

@Component({
  selector: 'app-module-link',
  templateUrl: './module-link.component.html',
  styleUrls: ['./module-link.component.css']
})
export class ModuleLinkComponent implements OnInit, OnDestroy {
  isLoading = false;
  private rawModuleSub: Subscription;
  public rawModuleList: RawModule[];
  form: FormGroup;

  constructor(private modulesService: ModulesService) { }

  ngOnInit() {
    this.getRawModules();
    this.form = new FormGroup({
      name: new FormControl(null, { validators: [Validators.required, Validators.minLength(4)] }),
      module: new FormControl(null, { validators: [Validators.required]}),
    });
  }

  getRawModules() {
    this.modulesService.getRawModules();
    this.rawModuleSub = this.modulesService.getRawModulesUpdateListener().subscribe((moduleData: { modules: RawModule[] }) => {
      this.rawModuleList = moduleData.modules;
    });
  }

  onSaveModule() {
    if (this.form.invalid) { return; }
    const rawModule = this.rawModuleList.find(module => module.moduleName === this.form.value.module.moduleName);
    this.modulesService.addNewModule(this.form.value.name, rawModule.ipAddress);
    this.isLoading = true;
    this.form.reset();
  }

  ngOnDestroy() {
    this.rawModuleSub.unsubscribe();
  }

}
