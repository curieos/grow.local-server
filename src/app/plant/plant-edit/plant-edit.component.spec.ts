import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PlantModule } from '../plant.module';
import { PlantService } from '../plant.service';
import { MockPlantService } from '../plant.service.mock';
import { PlantEditComponent } from './plant-edit.component';

describe('PlantEditComponent', () => {
  let component: PlantEditComponent;
  let fixture: ComponentFixture<PlantEditComponent>;
  let plantsService: PlantService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        PlantModule,
      ],
      declarations: [
        PlantEditComponent,
      ],
      providers: [
        PlantEditComponent,
        { provide: PlantService, useClass: MockPlantService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: '1' } },
          },
        },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(PlantEditComponent);
    component = fixture.componentInstance;
    plantsService = TestBed.inject(PlantService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have form value filled out', () => {
    expect(component.form.get('name').value).toEqual('Violets');
  });

  describe('#updateForm', () => {
    it('should not set the form value \'name\' if plant is null', () => {
      component.plant = null;

      component.updateForm();

      expect(component.form.get('name').value).toEqual('Violets');
    });
  });

  describe('#updatePlant', () => {
    it('should modify the plant if form data is changed', () => {
      const newValue = 'newPlant';
      component.form.get('name').setValue(newValue);

      component.updatePlant();

      expect(component.plant.name).toEqual(newValue);
    });
  });

  describe('#updatePlantSettings', () => {
    it('should call on the plants service to update the plant', () => {
      const serviceSpy = spyOn(plantsService, 'updatePlantSettings');

      component.updatePlantSettings();

      expect(serviceSpy).toHaveBeenCalledWith(component.plant);
    });

    it('should not call on the plants service if the form is invalid', () => {
      const serviceSpy = spyOn(plantsService, 'updatePlantSettings');

      component.form.get('name').setValue('i');

      component.updatePlantSettings();

      expect(serviceSpy).toHaveBeenCalledTimes(0);
    });

    it('should not call on the plants service if there is no plant', () => {
      const serviceSpy = spyOn(plantsService, 'updatePlantSettings');

      component.plant = null;

      component.updatePlantSettings();

      expect(serviceSpy).toHaveBeenCalledTimes(0);
    });
  });
});
