import { Observable, of } from 'rxjs';
import { Module } from './module.model';
import { RawModule } from './rawmodule.model';

export class MockModulesService {

  constructor() { }

  getModules(): void { }

  getModulesUpdateListener(): Observable<{ modules: Module[] }> {
    const module1 = new Module();
    module1.id = '1';
    module1.name = 'ModuleA';
    module1.ipAddress = '192.168.0.111';
    return of({ modules: [module1] });
  }

  getModuleInfo(id: string): void { }

  getModuleInfoUpdateListener() {
    const module = new Module();
    module.id = '1';
    module.name = 'ModuleA';
    module.moduleName = 'MACADDRESS';
    module.ipAddress = '192.168.0.111';
    return of({ module });
  }

  getModuleSettings(id: string): void { }

  getModuleSettingsUpdateListener() {
    const module = new Module();
    module.id = '1';
    module.name = 'ModuleA';
    module.ipAddress = '192.168.0.111';
    return of({ module });
  }

  getRawModules(): void { }

  getRawModulesUpdateListener(): Observable<{ modules: RawModule[] }> {
    const module1 = new RawModule();
    module1.moduleName = 'New Module';
    module1.ipAddress = '192.168.0.111';
    return of({ modules: [module1] });
  }

  addNewModule(name: string, ip: string): void { }

  updateModuleSettings(module: Module): void { }

  deleteModule(moduleID: string): void { }
}
