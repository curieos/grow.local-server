import { Observable, Subject } from 'rxjs';
import { Plant } from './plant.model';

export class MockPlantsService {
  private plantsUpdated = new Subject<{ plants: Plant[] }>();
  private plantInfoUpdated = new Subject<{ plant: Plant }>();
  private plantSettingsUpdated = new Subject<{ plant: Plant }>();

  constructor() { }

  getPlants(): void {
    this.plantsUpdated.next({ plants: [] });
  }

  getPlantsUpdateListener(): Observable<{ plants: Plant[] }> {
    return this.plantsUpdated.asObservable();
  }

  getPlantInfo(plantID: string): void {
    this.plantInfoUpdated.next({ plant: new Plant(plantID, 'Violets') });
  }

  getPlantInfoUpdateListener(): Observable<{ plant: Plant }> {
    return this.plantInfoUpdated.asObservable();
  }

  getPlantSettings(plantID: string): void {
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
