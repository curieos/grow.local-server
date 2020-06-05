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
    });
  }

  getModuleInfoUpdateListener() {
    return this.moduleInfoUpdated.asObservable();
  }

  getRawModules() {
    this.http.get<{ message: string, modules: any }>(environment.apiURL + '/modules/raw').pipe(map((data) => {
      return {
        modules: data.modules.map((module) => {
          return { moduleName: module.moduleName, ipAddress: module.ipAddress };
        })
      };
    })).subscribe((transformedModules) => {
      this.rawModules = transformedModules.modules;
      this.rawModulesUpdated.next({ modules: [...this.rawModules] });
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
    });
  }

  deleteModule(moduleID: string) {
    this.http.delete(environment.apiURL + '/modules/' + moduleID).subscribe();
  }
}
