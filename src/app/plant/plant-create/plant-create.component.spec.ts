import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ModuleService } from 'src/app/module/module.service';
import { MockModuleService } from 'src/app/module/module.service.mock';
import { PlantModule } from '../plant.module';
import { PlantService } from '../plant.service';
import { MockPlantService } from '../plant.service.mock';
import { PlantCreateComponent } from './plant-create.component';

describe('PlantCreateComponent', () => {
  let component: PlantCreateComponent;
  let fixture: ComponentFixture<PlantCreateComponent>;
  let plantsService: PlantService;
  let modulesService: ModuleService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        PlantModule,
      ],
      declarations: [
        PlantCreateComponent,
      ],
      providers: [
        PlantCreateComponent,
        { provide: PlantService, useClass: MockPlantService },
        { provide: ModuleService, useClass: MockModuleService },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(PlantCreateComponent);
    component = fixture.componentInstance;
    plantsService = TestBed.inject(PlantService);
    modulesService = TestBed.inject(ModuleService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onSavePlant', () => {
    it('should not call addNewPlant if the form is invalid', () => {
      const serviceSpy = spyOn(plantsService, 'addNewPlant');

      component.form.get('name').setValue('Violets');
      component.form.get('module').setValue(component.moduleList[0]);

      component.onSavePlant();

      expect(serviceSpy).toHaveBeenCalledWith('Violets', 'ModuleA');
    });

    it('should not call addNewPlant if the form is invalid', () => {
      const serviceSpy = spyOn(plantsService, 'addNewPlant');

      component.onSavePlant();

      expect(serviceSpy).toHaveBeenCalledTimes(0);
    });
  });
});
