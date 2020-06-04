import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Plant } from './plant.model';

@Injectable({ providedIn: 'root' })
export class PlantsService {
  private plants: Plant[] = [];
  private plantsUpdated = new Subject<{ plants: Plant[] }>();
  private plantInfoUpdated = new Subject<{ plant: Plant }>();

  constructor(private http: HttpClient, private router: Router) { }

  getPlants() {
    this.http.get<{ message: string, plants: any }>(environment.apiURL + '/plants').pipe(map((data) => {
      return {
        plants: data.plants.map((plant) => {
          return { id: plant.id, name: plant.name, };
        })
      };
    })).subscribe((transformedPlants) => {
      this.plants = transformedPlants.plants;
      this.plantsUpdated.next({ plants: [...this.plants] });
    });
  }

  getPlantsUpdateListener() {
    return this.plantsUpdated.asObservable();
  }

  getPlantInfo(plantID: string) {
    this.http.get<{
      message: string,
      data: {
        ambientTemperature: [{ value: number, time: string }],
        humidity: [{ value: number, time: string }],
        soilMoisture: [{ value: number, time: string }]
      }
    }>(environment.apiURL + '/plants/' + plantID + '/info').subscribe(data => {
      const plant = this.plants.find(p => p.id === plantID);
      plant.temperatureHistory = data.data.ambientTemperature;
      plant.humidityHistory = data.data.humidity;
      plant.soilMoistureHistory = data.data.soilMoisture;
      this.plantInfoUpdated.next({ plant });
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
      { headers: { 'Content-Type': 'application/json' } }
    ).subscribe((responseData) => {
      this.router.navigate(['/plants']);
    });
  }

  deletePlant(plantID: string) {
    this.http.delete(environment.apiURL + '/plants/' + plantID).subscribe();
  }
}
