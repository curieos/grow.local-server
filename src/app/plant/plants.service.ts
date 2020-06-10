import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Plant } from './plant.model';

@Injectable({ providedIn: 'root' })
export class PlantsService {
  private plantsUpdated = new Subject<{ plants: Plant[] }>();
  private plantInfoUpdated = new Subject<{ plant: Plant }>();
  private plantSettingsUpdated = new Subject<{ plant: Plant }>();

  constructor(private http: HttpClient, private router: Router) { }

  getPlants(): void {
    this.http.get<{ message: string, plants: any }>(environment.apiURL + '/plants').pipe(map((data) => {
      return {
        plants: data.plants.map((plant: { id: string; name: string; }) => {
          return new Plant(plant.id, plant.name);
        }),
      };
    })).subscribe((transformedPlants) => {
      this.plantsUpdated.next({ plants: [...transformedPlants.plants] });
    }, () => {
      this.plantsUpdated.next({ plants: null });
    });
  }

  getPlantsUpdateListener(): Observable<{ plants: Plant[] }> {
    return this.plantsUpdated.asObservable();
  }

  getPlantInfo(plantID: string): void {
    this.http.get<{
      message: string,
      plant: { id: string, name: string },
      data: {
        ambientTemperature: Array<{ value: number, time: string }>,
        humidity: Array<{ value: number, time: string }>,
        soilMoisture: Array<{ value: number, time: string }>,
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
    }, () => {
      this.plantInfoUpdated.next({ plant: null });
    });
  }

  getPlantInfoUpdateListener(): Observable<{ plant: Plant }> {
    return this.plantInfoUpdated.asObservable();
  }

  getPlantSettings(plantID: string): void {
    this.http.get<{
      message: string
      plant: { id: string, name: string },
    }>(environment.apiURL + '/plants/' + plantID + '/settings').pipe(map((data) => {
      return {
        plant: new Plant(
          data.plant.id,
          data.plant.name,
        ),
      };
    })).subscribe((data) => {
      this.plantSettingsUpdated.next(data);
    }, () => {
      this.plantSettingsUpdated.next({ plant: null });
    });
  }

  getPlantSettingsUpdateListener(): Observable<{ plant: Plant }> {
    return this.plantSettingsUpdated.asObservable();
  }

  addNewPlant(plantName: string, moduleName: string): void {
    const postData = JSON.stringify({ plantName, moduleName });
    this.http.post(
      environment.apiURL + '/plants',
      postData,
      { headers: { 'Content-Type': 'application/json' } },
    ).subscribe(() => {
      this.router.navigate(['/plants']);
    }, () => {

    });
  }

  updatePlantSettings(plant: Plant): void {
    const postData = JSON.stringify({ plantName: plant.name });
    this.http.post(
      environment.apiURL + '/plants/' + plant.id + '/settings',
      postData,
      { headers: { 'Content-Type': 'application/json' } },
    ).subscribe(() => {
      this.router.navigate(['/plants']);
    }, () => {

    });
  }

  deletePlant(plantID: string): void {
    this.http.delete(environment.apiURL + '/plants/' + plantID).subscribe();
  }
}
