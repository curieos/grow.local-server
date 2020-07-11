import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PlantService } from '../plant.service';
import { MockPlantService } from '../plant.service.mock';
import { PlantListComponent } from './plant-list.component';
import { SharedModule } from 'src/app/shared/shared.module';

describe('PlantListComponent', () => {
  let component: PlantListComponent;
  let fixture: ComponentFixture<PlantListComponent>;
  let plantsService: PlantService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        SharedModule,
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
