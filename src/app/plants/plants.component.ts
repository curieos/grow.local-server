import { Component, OnInit } from '@angular/core';
import { Plant } from "../plant";
import { PLANTS } from "../mock-plants";

@Component({
	selector: 'app-plants',
	templateUrl: './plants.component.html',
	styleUrls: ['./plants.component.css']
})
export class PlantsComponent implements OnInit {
	plants = PLANTS;
	selectedPlant: Plant;
	onSelect(plant : Plant): void {
		this.selectedPlant = plant;
	}

	constructor() { }

	ngOnInit() {
	}

}
