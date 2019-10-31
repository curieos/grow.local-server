import { Injectable } from "@angular/core";
import { Plant } from './plant.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class PlantsService {
  private plants: Plant[] = [];
  private plantsUpdated = new Subject<{ plants: Plant[] }>();

  constructor(private http: HttpClient) { }

  getPlants() {
    this.http.get<{ message: string, plants: any }>('http://localhost:3400/api/plants').pipe(map((data) => {
      return {
        plants: data.plants.map(plant => {
          return { _id: plant._id, name: plant.name, };
        })
      };
    })).subscribe((transformedPlants) => {
      this.plants = transformedPlants.plants;
      this.plantsUpdated.next({ plants: [...this.plants] })
    });
  }

  getPlantsUpdateListener() {
    return this.plantsUpdated.asObservable();
  }
}
