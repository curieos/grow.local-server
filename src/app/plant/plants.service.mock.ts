import { Observable, Subject } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Plant } from './plant.model';

export class MockPlantsService {
  private plantsUpdated = new Subject<{ plants: Plant[] }>();
  private plantInfoUpdated = new Subject<{ plant: Plant }>();
  private plantSettingsUpdated = new Subject<{ plant: Plant }>();

  constructor() { }

  getPlants(): void {
    delay(100);
    this.plantsUpdated.next({ plants: [] });
  }

  getPlantsUpdateListener(): Observable<{ plants: Plant[] }> {
    return this.plantsUpdated.asObservable();
  }

  getPlantInfo(plantID: string): void {
    delay(100);
    this.plantInfoUpdated.next({ plant: new Plant(
      plantID,
      'Violets',
      [{ value: 25, time: '08:30' }],
      [{ value: 50, time: '08:30' }],
      [{ value: 800, time: '08:30' }]),
    });
  }

  getPlantInfoUpdateListener(): Observable<{ plant: Plant }> {
    return this.plantInfoUpdated.asObservable();
  }

  getPlantSettings(plantID: string): void {
    delay(100);
    this.plantSettingsUpdated.next({ plant: new Plant(plantID, 'Violets') });
  }

  getPlantSettingsUpdateListener(): Observable<{ plant: Plant }> {
    return this.plantSettingsUpdated.asObservable();
  }

  addNewPlant(plantName: string, moduleName: string): void {

  }

  updatePlantSettings(plant: Plant): void {

  }

  deletePlant(plantID: string): void {

  }
}
