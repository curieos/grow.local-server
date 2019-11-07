import { Component, OnInit, OnDestroy, SystemJsNgModuleLoader } from '@angular/core';
import { Subscription } from 'rxjs';
import { RawModule } from '../rawmodule.model';
import { ModulesService } from '../modules.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
    if (this.form.invalid) return;
    const rawModule = this.rawModuleList.find(module => module.name === this.form.value.module.name);
    this.modulesService.addNewModule(this.form.value.name, rawModule.ip);
    this.isLoading = true;
    this.form.reset();
  }

  ngOnDestroy() {
    this.rawModuleSub.unsubscribe();
  }

}
