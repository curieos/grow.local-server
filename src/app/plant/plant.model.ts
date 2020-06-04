import { Module } from '../module/module.model';

export class Plant {
  id: string;
  name: string;
  temperatureHistory: [{value: number, time: string}];
  humidityHistory: [{value: number, time: string}];
  soilMoistureHistory: [{value: number, time: string}];
  module: Module;
}
