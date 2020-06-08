import { Plant } from './plant.model';

describe('Plant', () => {
  let plant: Plant;

  beforeEach(() => {
    plant = new Plant('1', 'Violets', [
      { value: 24.0, time: '8:30' },
      { value: 27.0, time: '8:40' },
      { value: 25.0, time: '8:50' },
      { value: 25.4, time: '9:00' },
    ], [
      { value: 52.2, time: '8:30' },
      { value: 52.7, time: '8:40' },
      { value: 51.0, time: '8:50' },
      { value: 50.0, time: '9:00' },
    ], [
      { value: 812, time: '8:30' },
      { value: 810, time: '8:40' },
      { value: 800, time: '8:50' },
      { value: 850, time: '9:00' },
    ]);
  });

  it('should have an id and a name', () => {
    expect(plant.id).toEqual('1');
    expect(plant.name).toEqual('Violets');
  });

  it('should have method getCurrentTemperature that returns the current temperature', () => {
    expect(plant.getCurrentTemperature()).toEqual(25.4);
  });

  it('should have method getCurrentHumidity that returns the current humidity', () => {
    expect(plant.getCurrentHumidity()).toEqual(50.0);
  });

  it('should have method getCurrentSoilMoisture that returns the current soil moisture', () => {
    expect(plant.getCurrentSoilMoisture()).toEqual(850);
  });

  it('should have method getAverageTemperature that returns the average temperature', () => {
    expect(plant.getAverageTemperature()).toEqual(25.35);
  });

  it('should have method getAverageHumidity that returns the average humidity', () => {
    expect(plant.getAverageHumidity()).toEqual(51.475);
  });

  it('should have method getAverageSoilMoisture that returns the average soil moisture', () => {
    expect(plant.getAverageSoilMoisture()).toEqual(818);
  });
});
