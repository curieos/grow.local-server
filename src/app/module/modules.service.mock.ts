import { Observable, of } from 'rxjs';
import { Module } from './module.model';
import { RawModule } from './rawmodule.model';

export class MockModulesService {

  constructor() { }

  getModules(): void {}

  getModulesUpdateListener(): Observable<{ modules: Module[] }> {
    return of({ modules: [] });
  }

  getModuleInfo(id: string): void {}

  getModuleInfoUpdateListener() {
    return of({ modules: null });
  }

  getModuleSettings(id: string): void {}

  getModuleSettingsUpdateListener() {
    return of({ module: null });
  }

  getRawModules(): void {}

  getRawModulesUpdateListener(): Observable<{ modules: RawModule[] }> {
    return of({ modules: [] });
  }

  addNewModule(name: string, ip: string): void {}

  updateModuleSettings(module: Module): void {}

  deleteModule(moduleID: string): void {}
}
