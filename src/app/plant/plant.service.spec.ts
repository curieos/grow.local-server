import { HttpClientModule } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { PlantsService } from './plants.service';

describe('PlantsService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  }));

  it('should be created', () => {
    const service: PlantsService = TestBed.inject(PlantsService);
    expect(service).toBeTruthy();
  });
});
