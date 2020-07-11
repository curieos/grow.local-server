import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Plant } from '../plant.model';
import { PlantModule } from '../plant.module';
import { PlantService } from '../plant.service';
import { MockPlantService } from '../plant.service.mock';
import { PlantListItemComponent } from './plant-list-item.component';

describe('PlantListItemComponent', () => {
  let component: PlantListItemComponent;
  let fixture: ComponentFixture<PlantListItemComponent>;
  let plantsService: PlantService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        PlantModule,
      ],
      declarations: [
        PlantListItemComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlantListItemComponent,
        { provide: PlantService, useClass: MockPlantService },
      ],
    });
    fixture = TestBed.createComponent(PlantListItemComponent);
    component = fixture.componentInstance;
    plantsService = TestBed.inject(PlantService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#setChartTo', () => {
    it('should modify the chart data set', () => {
      const plant = new Plant(
        '1',
        'Violets',
        [
          { value: 24.0, time: '08:30' },
          { value: 24.3, time: '08:40' },
          { value: 24.5, time: '08:50' },
          { value: 24.9, time: '09:00' },
        ],
        [
          { value: 50.0, time: '08:30' },
          { value: 51.3, time: '08:40' },
          { value: 52.5, time: '08:50' },
          { value: 53.9, time: '09:00' },
        ],
      );

      component.setChartTo(plant.humidityHistory, 'Humidity');

      expect(component.multi[0].name).toEqual('Humidity');
      expect(component.yAxisLabel).toEqual('Humidity');
    });
  });

  describe('#getPlantInfo', () => {
    it('should request plant info', () => {
      component._plant = new Plant('1', 'Violets');
      const serviceSpy = spyOn(plantsService, 'getPlantInfo');

      component.getPlantInfo();

      expect(serviceSpy).toHaveBeenCalledWith(component.plant.id);
    });
  });

  describe('#deletePlant', () => {
    it('should tell the plants service to delete plant', async(() => {
      const serviceSpy = spyOn(plantsService, 'deletePlant');

      component.deletePlant('1');

      expect(serviceSpy).toHaveBeenCalledWith('1');
    }));
  });
});
