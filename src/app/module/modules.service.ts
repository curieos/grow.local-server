import { Injectable } from '@angular/core';
import { Module } from './module.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { RawModule } from './rawmodule.model';

@Injectable({ providedIn: 'root' })
export class ModulesService {
  private modules: Module[] = [];
  private rawModules: RawModule[] = [];
  private modulesUpdated = new Subject<{ modules: Module[] }>();
  private rawModulesUpdated = new Subject<{ modules: RawModule[] }>();

  constructor(private http: HttpClient, private router: Router) { }

  getModules() {
    this.http.get<{ message: string, modules: any }>(environment.apiURL + '/modules').pipe(map((data) => {
      return {
        modules: data.modules.map(module => {
          return { id: module.id, name: module.name, };
        })
      };
    })).subscribe((transformedModules) => {
      this.modules = transformedModules.modules;
      this.modulesUpdated.next({ modules: [...this.modules] })
    });
  }

  getModulesUpdateListener() {
    return this.modulesUpdated.asObservable();
  }

  getRawModules() {
    this.http.get<{ message: string, modules: any}>(environment.apiURL + '/modules/raw').pipe(map((data) => {
      return {
        modules: data.modules.map(module => {
          return { name: module.name, ip: module.ip };
        })
      };
    })).subscribe((transformedModules) => {
      this.rawModules = transformedModules.modules;
      this.rawModulesUpdated.next({ modules: [...this.rawModules]})
    });
  }

  getRawModulesUpdateListener() {
    return this.rawModulesUpdated.asObservable();
  }

  addNewModule(name: string, ip: string) {
    const postData = JSON.stringify({name, ip});
    this.http.post(environment.apiURL + '/modules', postData, { headers: { 'Content-Type': 'application/json' } }).subscribe((responseData) => {
      this.router.navigate(['/modules']);
    });
  }

  deleteModule(moduleID: string) {
    this.http.delete(environment.apiURL + '/modules/' + moduleID).subscribe();
  }
}
