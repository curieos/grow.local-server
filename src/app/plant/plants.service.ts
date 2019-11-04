import { Injectable } from "@angular/core";
import { Plant } from './plant.model';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class PlantsService {
  private plants: Plant[] = [];
  private plantsUpdated = new Subject<{ plants: Plant[] }>();

  constructor(private http: HttpClient, private router: Router) { }

  getPlants() {
    this.http.get<{ message: string, plants: any }>(environment.apiURL + '/plants').pipe(map((data) => {
      return {
        plants: data.plants.map(plant => {
          return { id: plant.id, name: plant.name, };
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

  addNewPlant(plantName: string, moduleName: string) {
    const plantData = new FormData();
    plantData.append('plantName', plantName);
    plantData.append('moduleName', moduleName);
    this.http.post(environment.apiURL + '/plants', plantData).subscribe((responseData) => {
      this.router.navigate(['/']);
    });
  }
}
