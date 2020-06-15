import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Module } from '../module.model';
import { ModulesService } from '../modules.service';
import { MockModulesService } from '../modules.service.mock';
import { ModuleListComponent } from './module-list.component';

describe('ModuleListComponent', () => {
  let component: ModuleListComponent;
  let fixture: ComponentFixture<ModuleListComponent>;
  let modulesService: ModulesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
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
        { provide: ModulesService, useClass: MockModulesService },
      ],
    });
    fixture = TestBed.createComponent(ModuleListComponent);
    component = fixture.componentInstance;
    modulesService = TestBed.inject(ModulesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
