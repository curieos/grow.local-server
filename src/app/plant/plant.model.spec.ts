import { Plant } from './plant.model';

describe('Plant', () => {
  let plant: Plant;

  beforeEach(() => {
    plant = new Plant('1', 'Violets', [
      { value: 24.0, time: '08:30' },
      { value: 27.0, time: '08:40' },
      { value: 25.0, time: '08:50' },
      { value: 25.4, time: '09:00' },
    ], [
      { value: 52.2, time: '08:30' },
      { value: 52.7, time: '08:40' },
      { value: 51.0, time: '08:50' },
      { value: 50.0, time: '09:00' },
    ], [
      { value: 812, time: '08:30' },
      { value: 810, time: '08:40' },
      { value: 800, time: '08:50' },
      { value: 850, time: '09:00' },
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

  it('should have getCurrent* methods return 0 if no data is available', () => {
    const emptyPlant = new Plant('1', 'Violets');
    expect(emptyPlant.getCurrentTemperature()).toEqual(0);
    expect(emptyPlant.getCurrentHumidity()).toEqual(0);
    expect(emptyPlant.getCurrentSoilMoisture()).toEqual(0);
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

  it('should have a static method getPlantHistoryTimestamp that returns a formatted timestamp array', () => {
    expect(Plant.getPlantHistoryTimestamp(plant.temperatureHistory)).toEqual(['08:30', '08:40', '08:50', '09:00']);
    expect(Plant.getPlantHistoryTimestamp(plant.humidityHistory)).toEqual(['08:30', '08:40', '08:50', '09:00']);
    expect(Plant.getPlantHistoryTimestamp(plant.soilMoistureHistory)).toEqual(['08:30', '08:40', '08:50', '09:00']);
  });

  it('should have a static method getChartData that returns formatted chart data', () => {
    expect(Plant.getChartData(plant.temperatureHistory, 'Temperature')).toEqual(
      { data: [24, 27, 25, 25.4], label: 'Temperature', yAxisID: 'temperature' });
    expect(Plant.getChartData(plant.humidityHistory, 'Humidity')).toEqual(
      { data: [52.2, 52.7, 51, 50], label: 'Humidity', yAxisID: 'humidity' });
    expect(Plant.getChartData(plant.soilMoistureHistory, 'Soil Moisture')).toEqual(
      { data: [812, 810, 800, 850], label: 'Soil Moisture', yAxisID: 'soilMoisture' });
  });
});
