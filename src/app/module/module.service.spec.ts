import { HttpClientModule } from '@angular/common/http';
import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ModulesService } from './modules.service';

describe('ModulesService', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
      ],
    }).compileComponents();
  }));

  it('should be created', () => {
    const service: ModulesService = TestBed.get(ModulesService);
    expect(service).toBeTruthy();
  });
});
