import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PlantsService } from '../plants.service';
import { MockPlantsService } from '../plants.service.mock';
import { PlantListComponent } from './plant-list.component';

describe('PlantListComponent', () => {
  let component: PlantListComponent;
  let fixture: ComponentFixture<PlantListComponent>;

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
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
