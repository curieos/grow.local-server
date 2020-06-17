import { Module } from '../module/module.model';
import { Searchable } from '../searchable';

export class Plant extends Searchable {
  module: Module;

  static getChartData(data: Array<{ value: number, time: string }>, name: string):
    { name: string, series: Array<{ name: Date, value: number }> } {
    const newData = {
      name,
      series: [],
    };
    for (const dataPoint of data) {
      newData.series.push({ name: new Date(dataPoint.time), value: dataPoint.value });
    }
    return newData;
  }

  constructor(
    id: string,
    name: string,
    public temperatureHistory: Array<{ value: number, time: string }> = null,
    public humidityHistory: Array<{ value: number, time: string }> = null,
    public soilMoistureHistory: Array<{ value: number, time: string }> = null,
  ) {
    super(id, name);
  }

  getCurrentTemperature() {
    return this.getCurrentValue(this.temperatureHistory);
  }

  getCurrentHumidity() {
    return this.getCurrentValue(this.humidityHistory);
  }

  getCurrentSoilMoisture() {
    return this.getCurrentValue(this.soilMoistureHistory);
  }

  getCurrentValue(data: Array<{ value: number, time: string }>) {
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

  getAverage(data: Array<{ value: number, time: string }>) {
    let avg = 0;
    for (const dataPoint of data) {
      avg += dataPoint.value;
    }
    avg /= data.length;
    return avg;
  }
}
