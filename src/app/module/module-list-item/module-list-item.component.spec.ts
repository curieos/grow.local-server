import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Module } from '../module.model';
import { ModuleModule } from '../module.module';
import { ModuleService } from '../module.service';
import { MockModuleService } from '../module.service.mock';
import { ModuleListItemComponent } from './module-list-item.component';

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe('ModuleListItemComponent', () => {
  let component: ModuleListItemComponent;
  let fixture: ComponentFixture<ModuleListItemComponent>;
  let modulesService: ModuleService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        ModuleModule,
      ],
      declarations: [
        ModuleListItemComponent,
      ],
      providers: [
        ModuleListItemComponent,
        { provide: ModuleService, useClass: MockModuleService },
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(ModuleListItemComponent);
    component = fixture.componentInstance;
    modulesService = TestBed.inject(ModuleService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#getModuleInfo', () => {
    it('should request module info', async(() => {
      component._module = new Module('1', 'ModuleA');
      const serviceSpy = spyOn(modulesService, 'getModuleInfo');

      component.getModuleInfo();

      expect(serviceSpy).toHaveBeenCalledWith(component.module.id);
    }));
    it('should not update module info if the id does not match', async(() => {
      component._module = new Module('1', 'ModuleA');
      const serviceSpy = spyOn(modulesService, 'getModuleInfo');

      component.getModuleInfo();

      expect(serviceSpy).toHaveBeenCalledWith(component.module.id);

      component.module = new Module('2', 'ModuleA');
      delay(20).then(() => {
        expect(component.module.moduleName).toBeUndefined();
      });
    }));
  });

  describe('#deleteModule', () => {
    it('should tell the modules service to delete a module', () => {
      const serviceSpy = spyOn(modulesService, 'deleteModule');

      component.deleteModule('1');

      expect(serviceSpy).toHaveBeenCalledWith('1');
    });
  });
});
