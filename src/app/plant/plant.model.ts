import { Module } from '../module/module.model';
import { IListable } from '../listable.interface';

export class Plant implements IListable {
  module: Module;

  static getPlantHistoryTimestamp(data: Array<{ value: number, time: string }>) {
    const label = [];
    for (const dataPoint of data) {
      label.push(dataPoint.time.slice(0, 5));
    }
    return label;
  }

  static getChartData(data: Array<{ value: number, time: string }>, label: string): { data: number[], label: string, yAxisID: string } {
    const newData = {
      data: [], label, yAxisID: label.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, (match, index) => {
        if (+match === 0) {
          return ''; // or if (/\s+/.test(match)) for white spaces
        }
        return index === 0 ? match.toLowerCase() : match.toUpperCase();
      }),
    };
    for (const dataPoint of data) {
      newData.data.push(dataPoint.value);
    }
    return newData;
  }

  constructor(
    public id: string,
    public name: string,
    public temperatureHistory: Array<{ value: number, time: string }> = null,
    public humidityHistory: Array<{ value: number, time: string }> = null,
    public soilMoistureHistory: Array<{ value: number, time: string }> = null,
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
