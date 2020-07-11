import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ModuleModule } from '../module.module';
import { ModuleService } from '../module.service';
import { MockModuleService } from '../module.service.mock';
import { ModuleListComponent } from './module-list.component';

describe('ModuleListComponent', () => {
  let component: ModuleListComponent;
  let fixture: ComponentFixture<ModuleListComponent>;
  let modulesService: ModuleService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        ModuleModule,
      ],
      declarations: [
        ModuleListComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ModuleListComponent,
        { provide: ModuleService, useClass: MockModuleService },
      ],
    });
    fixture = TestBed.createComponent(ModuleListComponent);
    component = fixture.componentInstance;
    modulesService = TestBed.inject(ModuleService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
