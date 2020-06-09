import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Module } from './module.model';
import { RawModule } from './rawmodule.model';

@Injectable({ providedIn: 'root' })
export class ModulesService {
  private modules: Module[] = [];
  private rawModules: RawModule[] = [];
  private modulesUpdated = new Subject<{ modules: Module[] }>();
  private moduleInfoUpdated = new Subject<{ module: Module }>();
  private moduleSettingsUpdated = new Subject<{ module: Module }>();
  private rawModulesUpdated = new Subject<{ modules: RawModule[] }>();

  constructor(private http: HttpClient, private router: Router) { }

  getModules() {
    this.http.get<{ message: string, modules: any }>(environment.apiURL + '/modules').pipe(map((data) => {
      return {
        modules: data.modules.map((module) => {
          return { id: module.id, name: module.name };
        }),
      };
    })).subscribe((transformedModules) => {
      this.modules = transformedModules.modules;
      this.modulesUpdated.next({ modules: [...this.modules] });
    }, (error) => {
      this.modulesUpdated.next({ modules: null });
    });
  }

  getModulesUpdateListener() {
    return this.modulesUpdated.asObservable();
  }

  getModuleInfo(id: string) {
    this.http.get<{
      moduleName: string,
      ipAddress: string,
      ambientTemperature: string,
    }>(environment.apiURL + '/modules/' + id + '/info').subscribe((data) => {
      const module = this.modules.find((m) => m.id === id);
      module.moduleName = data.moduleName;
      module.ipAddress = data.ipAddress;
      module.ambientTemperature = data.ambientTemperature;
      this.moduleInfoUpdated.next({ module });
    }, () => {
      this.moduleInfoUpdated.next({ module: null });
    });
  }

  getModuleInfoUpdateListener() {
    return this.moduleInfoUpdated.asObservable();
  }

  getModuleSettings(id: string) {
    this.http.get<{
      message: string,
      module: { id: string, name: string, ip: string },
    }>(environment.apiURL + '/modules/' + id + '/settings').subscribe((data) => {
      const module = new Module();
      module.id = data.module.id;
      module.name = data.module.name;
      module.ipAddress = data.module.ip;
      this.moduleSettingsUpdated.next({ module });
    }, () => {
      this.moduleSettingsUpdated.next({ module: null });
    });
  }

  getModuleSettingsUpdateListener() {
    return this.moduleSettingsUpdated.asObservable();
  }

  getRawModules() {
    this.http.get<{ message: string, modules: any }>(environment.apiURL + '/modules/raw').pipe(map((data) => {
      return {
        modules: data.modules.map((module) => {
          return { moduleName: module.moduleName, ipAddress: module.ipAddress };
        }),
      };
    })).subscribe((transformedModules) => {
      this.rawModules = transformedModules.modules;
      this.rawModulesUpdated.next({ modules: [...this.rawModules] });
    }, (error) => {
      this.rawModulesUpdated.next({ modules: null });
    });
  }

  getRawModulesUpdateListener() {
    return this.rawModulesUpdated.asObservable();
  }

  addNewModule(name: string, ip: string) {
    const postData = JSON.stringify({ name, ip });
    this.http.post(
      environment.apiURL + '/modules',
      postData,
      { headers: { 'Content-Type': 'application/json' } },
    ).subscribe((responseData) => {
      this.router.navigate(['/modules']);
    }, (error) => {
      console.log(error);
    });
  }

  updateModuleSettings(module: Module) {
    const postData = JSON.stringify({ name: module.name });
    this.http.post(
      environment.apiURL + '/modules/' + module.id + '/settings',
      postData,
      { headers: { 'Content-Type': 'application/json' } },
    ).subscribe(() => {
      this.router.navigate(['/modules']);
    }, (error) => {
      console.log(error);
    });
  }

  deleteModule(moduleID: string) {
    this.http.delete(environment.apiURL + '/modules/' + moduleID).subscribe();
  }
}
