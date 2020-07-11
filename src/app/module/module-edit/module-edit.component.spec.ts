import { HttpClientModule } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ModuleModule } from '../module.module';
import { ModuleService } from '../module.service';
import { MockModuleService } from '../module.service.mock';
import { ModuleEditComponent } from './module-edit.component';

describe('ModuleEditComponent', () => {
  let component: ModuleEditComponent;
  let fixture: ComponentFixture<ModuleEditComponent>;
  let modulesService: ModuleService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientModule,
        ModuleModule,
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
        { provide: ModuleService, useClass: MockModuleService },
        { provide: ActivatedRoute,
          useValue: {
            snapshot: { params: { id: '1' } },
          },
        },
      ],
    });
    fixture = TestBed.createComponent(ModuleEditComponent);
    component = fixture.componentInstance;
    modulesService = TestBed.inject(ModuleService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have form value filled out', () => {
    expect(component.form.get('name').value).toEqual('ModuleA');
  });

  describe('#updateForm', () => {
    it('should not set the form value \'name\' if module is null', () => {
      component.module = null;

      component.updateForm();

      expect(component.form.get('name').value).toEqual('ModuleA');
    });
  });

  describe('#updateModule', () => {
    it('should modify the module if form data is changed', () => {
      const newValue = 'newModule';
      component.form.get('name').setValue(newValue);

      component.updateModule();

      expect(component.module.name).toEqual(newValue);
    });
  });

  describe('#updateModuleSettings', () => {
    it('should call on the modules service to update the module', () => {
      const serviceSpy = spyOn(modulesService, 'updateModuleSettings');

      component.updateModuleSettings();

      expect(serviceSpy).toHaveBeenCalledWith(component.module);
    });

    it('should not call on the modules service if the form is invalid', () => {
      const serviceSpy = spyOn(modulesService, 'updateModuleSettings');

      component.form.get('name').setValue('i');

      component.updateModuleSettings();

      expect(serviceSpy).toHaveBeenCalledTimes(0);
    });

    it('should not call on the modules service if there is no module', () => {
      const serviceSpy = spyOn(modulesService, 'updateModuleSettings');

      component.module = null;

      component.updateModuleSettings();

      expect(serviceSpy).toHaveBeenCalledTimes(0);
    });
  });
});
