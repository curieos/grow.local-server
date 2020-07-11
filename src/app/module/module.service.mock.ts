import { Observable, of, Subject } from 'rxjs';
import { Module } from './module.model';
import { RawModule } from './rawmodule.model';

const testDelay = 10;

export class MockModuleService {
  private modulesUpdated = new Subject<{ modules: Module[] }>();
  private moduleInfoUpdated = new Subject<{ module: Module }>();
  private moduleSettingsUpdated = new Subject<{ module: Module }>();
  private rawModulesUpdated = new Subject<{ modules: RawModule[] }>();

  constructor() { }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  getModules(): void {
    this.delay(testDelay).then(() => {
      const module1 = new Module('1', 'ModuleA');
      module1.ipAddress = '192.168.0.111';
      this.modulesUpdated.next({ modules: [module1] });
    });
  }

  getModulesUpdateListener(): Observable<{ modules: Module[] }> {
    return this.modulesUpdated.asObservable();
  }

  getModuleInfo(id: string): void {
    this.delay(testDelay).then(() => {
      const module = new Module(id, 'ModuleA');
      module.moduleName = 'MACADDRESS';
      module.ipAddress = '192.168.0.111';
      this.moduleInfoUpdated.next({ module });
    });
  }

  getModuleInfoUpdateListener(): Observable<{ module: Module }> {
    return this.moduleInfoUpdated.asObservable();
  }

  getModuleSettings(id: string): void {
    this.delay(testDelay).then(() => {
      const module = new Module(id, 'ModuleA');
      module.ipAddress = '192.168.0.111';
      this.moduleSettingsUpdated.next({ module });
    });
  }

  getModuleSettingsUpdateListener(): Observable<{ module: Module }> {
    return this.moduleSettingsUpdated.asObservable();
  }

  getRawModules(): void {
    this.delay(testDelay).then(() => {
      const module1 = new RawModule();
      module1.moduleName = 'New Module';
      module1.ipAddress = '192.168.0.111';
      this.rawModulesUpdated.next({ modules: [module1] });
    });
  }

  getRawModulesUpdateListener(): Observable<{ modules: RawModule[] }> {
    return this.rawModulesUpdated.asObservable();
  }

  getUpdateProgress(module: Module): Observable<any> {
    return of({data: JSON.stringify({data: { progress: 100 }})});
  }

  addNewModule(name: string, ip: string): void { }

  updateModuleFirmware(module: Module, firmware: File): Observable<any> {
    return of();
  }

  updateModuleSettings(module: Module): void { }

  deleteModule(moduleID: string): void { }
}
