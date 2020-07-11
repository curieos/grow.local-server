import { Observable, of } from 'rxjs';
import { Plant } from './plant.model';

export class MockPlantService {

  constructor() { }

  getPlants(): void { }

  getPlantsUpdateListener(): Observable<{ plants: Plant[] }> {
    return of({ plants: [new Plant('1', 'Violets')] });
  }

  getPlantInfo(plantID: string): void { }

  getPlantInfoUpdateListener(): Observable<{ plant: Plant }> {
    return of({
      plant: new Plant(
        '1',
        'Violets',
        [
          { value: 25, time: '08:30' },
          { value: 25, time: '08:40' },
        ],
        [
          { value: 50, time: '08:30' },
          { value: 50, time: '08:40' },
        ],
        [
          { value: 800, time: '08:30' },
          { value: 800, time: '08:40' },
        ],
      ),
    });
  }

  getPlantSettings(plantID: string): void { }

  getPlantSettingsUpdateListener(): Observable<{ plant: Plant }> {
    return of({ plant: new Plant('1', 'Violets') });
  }

  addNewPlant(plantName: string, moduleName: string): void { }

  updatePlantSettings(plant: Plant): void { }

  deletePlant(plantID: string): void { }
}
