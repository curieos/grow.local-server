import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { PlantsService } from '../plants.service';
import { MockPlantsService } from '../plants.service.mock';
import { PlantEditComponent } from './plant-edit.component';

describe('PlantEditComponent', () => {
  let component: PlantEditComponent;
  let fixture: ComponentFixture<PlantEditComponent>;
  let plantsService: PlantsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
      ],
      declarations: [
        PlantEditComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlantEditComponent,
        { provide: PlantsService, useClass: MockPlantsService },
        { provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: '1' } },
          },
        },
      ],
    });
    fixture = TestBed.createComponent(PlantEditComponent);
    component = fixture.componentInstance;
    plantsService = TestBed.inject(PlantsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
