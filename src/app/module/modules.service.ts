import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Module } from './module.model';
import { RawModule } from './rawmodule.model';

@Injectable({ providedIn: 'root' })
export class ModulesService {
  private modulesUpdated = new Subject<{ modules: Module[] }>();
  private moduleInfoUpdated = new Subject<{ module: Module }>();
  private moduleSettingsUpdated = new Subject<{ module: Module }>();
  private rawModulesUpdated = new Subject<{ modules: RawModule[] }>();

  constructor(private http: HttpClient, private router: Router) { }

  getModules(): void {
    this.http.get<{ message: string, modules: any }>(environment.apiURL + '/modules').pipe(map((data) => {
      return {
        modules: data.modules.map((module) => {
          return { id: module.id, name: module.name };
        }),
      };
    })).subscribe((transformedModules) => {
      this.modulesUpdated.next({ modules: [...transformedModules.modules] });
    }, () => {
      this.modulesUpdated.next({ modules: null });
    });
  }

  getModulesUpdateListener(): Observable<{ modules: Module[] }> {
    return this.modulesUpdated.asObservable();
  }

  getModuleInfo(id: string): void {
    this.http.get<{
      message: string,
      module: {
        name: string,
        moduleName: string,
        ipAddress: string,
      },
    }>(environment.apiURL + '/modules/' + id + '/info').subscribe((data) => {
      const module = new Module(id, data.module.name);
      module.moduleName = data.module.moduleName;
      module.ipAddress = data.module.ipAddress;
      this.moduleInfoUpdated.next({ module });
    }, () => {
      this.moduleInfoUpdated.next({ module: null });
    });
  }

  getModuleInfoUpdateListener(): Observable<{ module: Module }> {
    return this.moduleInfoUpdated.asObservable();
  }

  getModuleSettings(id: string): void {
    this.http.get<{
      message: string,
      module: { id: string, name: string, ip: string },
    }>(environment.apiURL + '/modules/' + id + '/settings').subscribe((data) => {
      const module = new Module(data.module.id, data.module.name);
      module.ipAddress = data.module.ip;
      this.moduleSettingsUpdated.next({ module });
    }, () => {
      this.moduleSettingsUpdated.next({ module: null });
    });
  }

  getModuleSettingsUpdateListener(): Observable<{ module: Module }> {
    return this.moduleSettingsUpdated.asObservable();
  }

  getRawModules(): void {
    this.http.get<{ message: string, modules: any }>(environment.apiURL + '/modules/raw').pipe(map((data) => {
      return {
        modules: data.modules.map((module) => {
          return { moduleName: module.moduleName, ipAddress: module.ipAddress };
        }),
      };
    })).subscribe((transformedModules) => {
      this.rawModulesUpdated.next({ modules: [...transformedModules.modules] });
    }, () => {
      this.rawModulesUpdated.next({ modules: null });
    });
  }

  getRawModulesUpdateListener(): Observable<{ modules: RawModule[] }> {
    return this.rawModulesUpdated.asObservable();
  }

  addNewModule(name: string, ip: string): void {
    const postData = JSON.stringify({ name, ip });
    this.http.post(
      environment.apiURL + '/modules',
      postData,
      { headers: { 'Content-Type': 'application/json' } },
    ).subscribe(() => {
      this.router.navigate(['/modules']);
    }, () => {

    });
  }

  updateModuleSettings(module: Module): void {
    const postData = JSON.stringify({ name: module.name });
    this.http.post(
      environment.apiURL + '/modules/' + module.id + '/settings',
      postData,
      { headers: { 'Content-Type': 'application/json' } },
    ).subscribe(() => {
      this.router.navigate(['/modules']);
    }, () => {

    });
  }

  deleteModule(moduleID: string): void {
    this.http.delete(environment.apiURL + '/modules/' + moduleID).subscribe();
  }
}
