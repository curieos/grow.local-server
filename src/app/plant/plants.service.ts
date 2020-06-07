import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Plant } from './plant.model';

@Injectable({ providedIn: 'root' })
export class PlantsService {
  private plantsUpdated = new Subject<{ plants: Plant[] }>();
  private plantInfoUpdated = new Subject<{ plant: Plant }>();

  constructor(private http: HttpClient, private router: Router) { }

  getPlants() {
    this.http.get<{ message: string, plants: any }>(environment.apiURL + '/plants').pipe(map((data) => {
      return {
        plants: data.plants.map((plant: { id: string; name: string; }) => {
          return new Plant(plant.id, plant.name);
        }),
      };
    })).subscribe((transformedPlants) => {
      this.plantsUpdated.next({ plants: [...transformedPlants.plants] });
    });
  }

  getPlantsUpdateListener() {
    return this.plantsUpdated.asObservable();
  }

  getPlantInfo(plantID: string) {
    this.http.get<{
      message: string,
      plant: { id: string, name: string },
      data: {
        ambientTemperature: [{ value: number, time: string }],
        humidity: [{ value: number, time: string }],
        soilMoisture: [{ value: number, time: string }],
      },
    }>(environment.apiURL + '/plants/' + plantID + '/info').pipe(map((data) => {
      return {
        plant: new Plant(
          data.plant.id,
          data.plant.name,
          data.data.ambientTemperature,
          data.data.humidity,
          data.data.soilMoisture,
        ),
      };
    })).subscribe((data) => {
      this.plantInfoUpdated.next(data);
    });
  }

  getPlantInfoUpdateListener() {
    return this.plantInfoUpdated.asObservable();
  }

  addNewPlant(plantName: string, moduleName: string) {
    const postData = JSON.stringify({ plantName, moduleName });
    this.http.post(
      environment.apiURL + '/plants',
      postData,
      { headers: { 'Content-Type': 'application/json' } },
    ).subscribe(() => {
      this.router.navigate(['/plants']);
    });
  }

  deletePlant(plantID: string) {
    this.http.delete(environment.apiURL + '/plants/' + plantID).subscribe();
  }
}
