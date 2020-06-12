import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModulesService } from '../modules.service';
import { MockModulesService } from '../modules.service.mock';
import { ModuleLinkComponent } from './module-link.component';

describe('ModuleLinkComponent', () => {
  let component: ModuleLinkComponent;
  let fixture: ComponentFixture<ModuleLinkComponent>;
  let modulesService: ModulesService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule,
        NgbModule,
      ],
      declarations: [
        ModuleLinkComponent,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ModuleLinkComponent,
        { provide: ModulesService, useClass: MockModulesService },
      ],
    });
    fixture = TestBed.createComponent(ModuleLinkComponent);
    component = fixture.componentInstance;
    modulesService = TestBed.inject(ModulesService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#onSavePlant', () => {
    it('should not call addNewPlant if the form is invalid', () => {
      const serviceSpy = spyOn(modulesService, 'addNewModule');

      component.form.get('name').setValue('ModuleA');
      component.form.get('module').setValue(component.rawModuleList[0]);

      component.onSaveModule();

      expect(serviceSpy).toHaveBeenCalledWith('ModuleA', '192.168.0.111');
    });

    it('should not call addNewPlant if the form is invalid', () => {
      const serviceSpy = spyOn(modulesService, 'addNewModule');

      component.onSaveModule();

      expect(serviceSpy).toHaveBeenCalledTimes(0);
    });
  });
});
