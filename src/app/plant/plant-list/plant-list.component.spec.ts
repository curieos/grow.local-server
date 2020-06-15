import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PlantsService } from '../plants.service';
import { MockPlantsService } from '../plants.service.mock';
import { PlantListComponent } from './plant-list.component';

describe('PlantListComponent', () => {
  let component: PlantListComponent;
  let fixture: ComponentFixture<PlantListComponent>;
  let plantsService: PlantsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
      ],
      declarations: [
        PlantListComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PlantListComponent,
        { provide: PlantsService, useClass: MockPlantsService },
      ],
    });
    fixture = TestBed.createComponent(PlantListComponent);
    component = fixture.componentInstance;
    plantsService = TestBed.inject(PlantsService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
