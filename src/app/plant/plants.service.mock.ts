import { Observable, of, Subject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Plant } from './plant.model';

export class MockPlantsService {
  private plantsUpdated = new Subject<{ plants: Plant[] }>();
  private plantInfoUpdated = new Subject<{ plant: Plant }>();
  private plantSettingsUpdated = new Subject<{ plant: Plant }>();

  constructor() { }

  getPlants(): void {}

  getPlantsUpdateListener(): Observable<{ plants: Plant[] }> {
    return of({ plants: [] });
  }

  getPlantInfo(plantID: string): void {}

  getPlantInfoUpdateListener(): Observable<{ plant: Plant }> {
    return of({ plant: new Plant(
      '1',
      'Violets',
      [{ value: 25, time: '08:30' }],
      [{ value: 50, time: '08:30' }],
      [{ value: 800, time: '08:30' }]),
    });
  }

  getPlantSettings(plantID: string): void {
  }

  getPlantSettingsUpdateListener(): Observable<{ plant: Plant }> {
    return of({ plant: new Plant('1', 'Violets') });
  }

  addNewPlant(plantName: string, moduleName: string): void {

  }

  updatePlantSettings(plant: Plant): void {

  }

  deletePlant(plantID: string): void {

  }
}
