import { HttpClientModule, HttpResponse } from '@angular/common/http';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
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
  let moduleService: ModuleService;

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
    moduleService = TestBed.inject(ModuleService);
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('#getModuleInfo', () => {
    it('should request module info', async(() => {
      component._module = new Module('1', 'ModuleA');
      const serviceSpy = spyOn(moduleService, 'getModuleInfo');

      component.getModuleInfo();

      expect(serviceSpy).toHaveBeenCalledWith(component.module.id);
    }));
    it('should not update module info if the id does not match', async(() => {
      component._module = new Module('1', 'ModuleA');
      const serviceSpy = spyOn(moduleService, 'getModuleInfo');

      component.getModuleInfo();

      expect(serviceSpy).toHaveBeenCalledWith(component.module.id);

      component.module = new Module('2', 'ModuleA');
      delay(20).then(() => {
        expect(component.module.moduleName).toBeUndefined();
      });
    }));
  });

  describe('#onUploadUpdate', () => {
    it('should call updateModuleFirmware on module service', () => {
      const serviceSpy = spyOn(moduleService, 'updateModuleFirmware').and.returnValue(of(
        new HttpResponse<{ message: string }>({
          body: { message: 'Update Complete' },
        }),
      ));
      component._module = new Module('1', 'ModuleA');
      const file = new File([''], 'firmware.bin');
      const fileList = new DataTransfer();
      fileList.items.add(file);

      const fileInput = fixture.debugElement.query(By.css('#firmware'));
      (fileInput.nativeElement as HTMLInputElement).files = fileList.files;
      fileInput.triggerEventHandler('change', { target: fileInput.nativeElement });

      fixture.detectChanges();

      expect(serviceSpy).toHaveBeenCalledWith(component.module, file);
    });
    it('should get a completed response back', () => {
      component._module = new Module('1', 'ModuleA');
      const file = new File([''], 'firmware.bin');
      const fileList = new DataTransfer();
      fileList.items.add(file);

      const fileInput = fixture.debugElement.query(By.css('#firmware'));
      (fileInput.nativeElement as HTMLInputElement).files = fileList.files;
      fileInput.triggerEventHandler('change', { target: fileInput.nativeElement });

      fixture.detectChanges();

      expect(component.response).toEqual('Update Complete');
    });
  });

  describe('#deleteModule', () => {
    it('should tell the modules service to delete a module', () => {
      const serviceSpy = spyOn(moduleService, 'deleteModule');

      component.deleteModule('1');

      expect(serviceSpy).toHaveBeenCalledWith('1');
    });
  });
});
