import { Component, OnInit } from '@angular/core';
import { Module } from '../module.model';

@Component({
  selector: 'app-module-list',
  templateUrl: './module-list.component.html',
  styleUrls: ['./module-list.component.css']
})
export class ModuleListComponent implements OnInit {
  public moduleList: Module[];

  constructor() { }

  ngOnInit() {
  }

}
