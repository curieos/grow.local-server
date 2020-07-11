import { Observable, of, Subject } from 'rxjs';
import { Plant } from './plant.model';

const testDelay = 10;

export class MockPlantService {
  private plantsUpdated = new Subject<{ plants: Plant[] }>();
  private plantInfoUpdated = new Subject<{ plant: Plant }>();
  private plantSettingsUpdated = new Subject<{ plant: Plant }>();

  constructor() { }

  delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  getPlants(): void {
    this.delay(testDelay).then(() => {
      this.plantsUpdated.next({ plants: [new Plant('1', 'Violets')] });
    });
  }

  getPlantsUpdateListener(): Observable<{ plants: Plant[] }> {
    return this.plantsUpdated.asObservable();
  }

  getPlantInfo(plantID: string): void {
    this.delay(testDelay).then(() => {
      this.plantInfoUpdated.next({
        plant: new Plant(
          plantID,
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
    });
  }

  getPlantInfoUpdateListener(): Observable<{ plant: Plant }> {
    return this.plantInfoUpdated.asObservable();
  }

  getPlantSettings(plantID: string): void {
    this.delay(testDelay).then(() => {
      this.plantSettingsUpdated.next({ plant: new Plant(plantID, 'Violets') });
    });
  }

  getPlantSettingsUpdateListener(): Observable<{ plant: Plant }> {
    return this.plantSettingsUpdated.asObservable();
  }

  addNewPlant(plantName: string, moduleName: string): void { }

  updatePlantSettings(plant: Plant): void { }

  deletePlant(plantID: string): void { }
}
