import { Module } from '../module/module.model';

export interface Plant {
  id: string;
  name: string;
  module: Module;
}