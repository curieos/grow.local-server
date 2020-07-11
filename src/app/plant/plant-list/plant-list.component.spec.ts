import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PlantModule } from '../plant.module';
import { PlantService } from '../plant.service';
import { MockPlantService } from '../plant.service.mock';
import { PlantListComponent } from './plant-list.component';

describe('PlantListComponent', () => {
  let component: PlantListComponent;
  let fixture: ComponentFixture<PlantListComponent>;
  let plantsService: PlantService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        PlantModule,
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
        { provide: PlantService, useClass: MockPlantService },
      ],
    });
    fixture = TestBed.createComponent(PlantListComponent);
    component = fixture.componentInstance;
    plantsService = TestBed.inject(PlantService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
