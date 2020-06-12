import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModulesService } from 'src/app/module/modules.service';
import { MockModulesService } from 'src/app/module/modules.service.mock';
import { PlantsService } from '../plants.service';
import { MockPlantsService } from '../plants.service.mock';
import { PlantCreateComponent } from './plant-create.component';

describe('PlantCreateComponent', () => {
  let component: PlantCreateComponent;
  let fixture: ComponentFixture<PlantCreateComponent>;
  let plantsService: PlantsService;
  let modulesService: ModulesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
        NgbModule,
      ],
      declarations: [
        PlantCreateComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlantCreateComponent,
        { provide: PlantsService, useClass: MockPlantsService },
        { provide: ModulesService, useClass: MockModulesService },
      ],
    });
    fixture = TestBed.createComponent(PlantCreateComponent);
    component = fixture.componentInstance;
    plantsService = TestBed.inject(PlantsService);
    modulesService = TestBed.inject(ModulesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
