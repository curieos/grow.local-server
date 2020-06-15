import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ModulesService } from '../modules.service';
import { ModuleListItemComponent } from './module-list-item.component';
import { MockModulesService } from '../modules.service.mock';
import { Module } from '../module.model';


describe('ModuleListItemComponent', () => {
  let component: ModuleListItemComponent;
  let fixture: ComponentFixture<ModuleListItemComponent>;
  let modulesService: ModulesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
      ],
      declarations: [
        ModuleListItemComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ModuleListItemComponent,
        { provide: ModulesService, useClass: MockModulesService },
      ],
    });
    fixture = TestBed.createComponent(ModuleListItemComponent);
    component = fixture.componentInstance;
    modulesService = TestBed.inject(ModulesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#getModuleInfo', () => {
    it('should request module info', () => {
      component._module = new Module('1', 'ModuleA');
      const serviceSpy = spyOn(modulesService, 'getModuleInfo');

      component.getModuleInfo();

      expect(serviceSpy).toHaveBeenCalledWith(component.module.id);
    });
  });

  describe('#deleteModule', () => {
    it('should tell the modules service to delete a module', async(() => {
      const serviceSpy = spyOn(modulesService, 'deleteModule');

      component.deleteModule('1');

      expect(serviceSpy).toHaveBeenCalledWith('1');
    }));
  });
});
