import { Module } from '../module/module.model';

export interface Plant {
  _id: string;
  name: string;
  module: Module;
}