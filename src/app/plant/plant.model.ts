import { Module } from '../module/module.model';

export class Plant {
  module: Module;

  constructor(
    public id: string,
    public name: string,
    public temperatureHistory: [{ value: number, time: string }] = null,
    public humidityHistory: [{ value: number, time: string }] = null,
    public soilMoistureHistory: [{ value: number, time: string }] = null,
  ) { }

  getCurrentTemperature() {
    return this.getCurrentValue(this.temperatureHistory);
  }

  getCurrentHumidity() {
    return this.getCurrentValue(this.humidityHistory);
  }

  getCurrentSoilMoisture() {
    return this.getCurrentValue(this.soilMoistureHistory);
  }

  getCurrentValue(data: [{ value: number, time: string }]) {
    if (!data) {
      return 0;
    }
    return data[data.length - 1].value;
  }

  getAverageTemperature() {
    return this.getAverage(this.temperatureHistory);
  }

  getAverageHumidity() {
    return this.getAverage(this.humidityHistory);
  }

  getAverageSoilMoisture() {
    return this.getAverage(this.soilMoistureHistory);
  }

  getAverage(data: [{ value: number, time: string }]) {
    let avg = 0;
    for (const dataPoint of data) {
      avg += dataPoint.value;
    }
    avg /= data.length;
    return avg;
  }
}
