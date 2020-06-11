import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ModulesService } from '../modules.service';
import { MockModulesService } from '../modules.service.mock';
import { ModuleEditComponent } from './module-edit.component';

describe('ModuleEditComponent', () => {
  let component: ModuleEditComponent;
  let fixture: ComponentFixture<ModuleEditComponent>;
  let modulesService: ModulesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
      ],
      declarations: [
        ModuleEditComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ModuleEditComponent,
        { provide: ModulesService, useClass: MockModulesService },
        { provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: '1' } },
          },
        },
      ],
    });
    fixture = TestBed.createComponent(ModuleEditComponent);
    component = fixture.componentInstance;
    modulesService = TestBed.inject(ModulesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
