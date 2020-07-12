import { HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, getTestBed, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { Module } from './module.model';
import { ModuleService } from './module.service';

describe('ModuleService', () => {
  let injector: TestBed;
  let service: ModuleService;
  let httpMock: HttpTestingController;
  let router: Router;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
      ],
    }).compileComponents();
    injector = getTestBed();
    service = injector.inject(ModuleService);
    httpMock = injector.inject(HttpTestingController);
    router = injector.inject(Router);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getModules', () => {
    it('should return a list of modules', () => {
      const dummyRequest = {
        message: 'Modules Successfully Retrieved',
        modules: [
          { id: '1', name: 'ModuleA' },
        ],
      };

      service.getModules();
      service.getModulesUpdateListener().subscribe((data) => {
        expect(data.modules.length).toEqual(dummyRequest.modules.length);
      });

      const req = httpMock.expectOne(environment.apiURL + '/modules');
      expect(req.request.method).toBe('GET');
      req.flush(dummyRequest);
    });

    it('should return a null array on error', () => {
      service.getModules();
      service.getModulesUpdateListener().subscribe((data) => {
        expect(data.modules).toBeNull();
      });

      const req = httpMock.expectOne(environment.apiURL + '/modules');
      expect(req.request.method).toBe('GET');
      req.error(new ErrorEvent(''));
    });
  });

  describe('#getModuleInfo', () => {
    it('should return a module object with info filled out', () => {
      const dummyRequest = {
        message: '',
        module: {
          name: 'ModuleA',
          moduleName: 'MACADDRESS',
          ipAddress: '192.168.0.111',
        },
      };

      service.getModuleInfo('1');
      service.getModuleInfoUpdateListener().subscribe((data) => {
        expect(data.module.moduleName).toEqual(dummyRequest.module.moduleName);
        expect(data.module.ipAddress).toEqual(dummyRequest.module.ipAddress);
      });

      const req = httpMock.expectOne(environment.apiURL + '/modules/' + '1' + '/info');
      expect(req.request.method).toBe('GET');
      req.flush(dummyRequest);
    });

    it('should return null if given an error', () => {
      service.getModuleInfo('1');
      service.getModuleInfoUpdateListener().subscribe((data) => {
        expect(data.module).toBeNull();
      });

      const req = httpMock.expectOne(environment.apiURL + '/modules/' + '1' + '/info');
      expect(req.request.method).toBe('GET');
      req.error(new ErrorEvent(''));
    });
  });

  describe('#getModuleSettings', () => {
    it('should return a module object with settings filled out', () => {
      const dummyRequest = {
        message: '',
        module: {
          id: '1',
          name: 'ModuleA',
          ip: '192.168.0.111',
        },
      };

      service.getModuleSettings(dummyRequest.module.id);
      service.getModuleSettingsUpdateListener().subscribe((data) => {
        expect(data.module.name).toEqual(dummyRequest.module.name);
        expect(data.module.ipAddress).toEqual(dummyRequest.module.ip);
      });

      const req = httpMock.expectOne(environment.apiURL + '/modules/' + dummyRequest.module.id + '/settings');
      expect(req.request.method).toBe('GET');
      req.flush(dummyRequest);
    });

    it('should return a null object when there is an error', () => {
      service.getModuleSettings('1');
      service.getModuleSettingsUpdateListener().subscribe((data) => {
        expect(data.module).toBeNull();
      });

      const req = httpMock.expectOne(environment.apiURL + '/modules/' + '1' + '/settings');
      expect(req.request.method).toBe('GET');
      req.error(new ErrorEvent(''));
    });
  });

  describe('#getRawModules', () => {
    it('should return a list of raw modules', () => {
      const dummyRequest = {
        message: '',
        modules: [
          {
            moduleName: 'ModuleA',
            ipAddress: '192.168.0.111',
          },
        ],
      };

      service.getRawModules();
      service.getRawModulesUpdateListener().subscribe((data) => {
        expect(data.modules[0].moduleName).toEqual(dummyRequest.modules[0].moduleName);
        expect(data.modules[0].ipAddress).toEqual(dummyRequest.modules[0].ipAddress);
      });

      const req = httpMock.expectOne(environment.apiURL + '/modules/raw');
      expect(req.request.method).toBe('GET');
      req.flush(dummyRequest);
    });

    it('should return null if there is an error', () => {
      service.getRawModules();
      service.getRawModulesUpdateListener().subscribe((data) => {
        expect(data.modules).toBeNull();
      });

      const req = httpMock.expectOne(environment.apiURL + '/modules/raw');
      expect(req.request.method).toBe('GET');
      req.error(new ErrorEvent(''));
    });
  });

  describe('#addNewModule', () => {
    it('should navigate away on success', () => {
      const navSpy = spyOn(router, 'navigate');

      service.addNewModule('ModuleA', '192.168.0.111');

      const req = httpMock.expectOne(environment.apiURL + '/modules');
      expect(req.request.method).toBe('POST');
      req.flush({ message: 'Success' });
      expect(navSpy).toHaveBeenCalledWith(['/modules']);
    });
  });

  describe('#updateModuleFirmware', () => {
    it('should take upload progress and completion responses', () => {
      const module = new Module('1', 'ModuleA');
      const file = new File([''], 'firmware.bin');

      service.updateModuleFirmware(module, file).subscribe((event) => {
        switch (event.type) {
          case HttpEventType.Response:
            expect(event.body.message).toEqual('Update Complete');
            break;
          case HttpEventType.UploadProgress:
            const progress = Math.round(event.loaded / event.total * 100);
            expect(progress).toEqual(100);
            break;
        }
      });

      const req = httpMock.expectOne(environment.apiURL + '/modules/' + module.id + '/update');
      expect(req.request.method).toBe('POST');
      req.event({
        type: HttpEventType.UploadProgress,
        loaded: 10,
        total: 10
      });
      req.event(new HttpResponse({
        body: { message: 'Update Complete' },
      }));
    });
  });

  describe('#updateModuleSettings', () => {
    it('should navigate away on success', () => {
      const navSpy = spyOn(router, 'navigate');
      const module = new Module('1', 'ModuleA');

      service.updateModuleSettings(module);

      const req = httpMock.expectOne(environment.apiURL + '/modules/' + module.id);
      expect(req.request.method).toBe('PATCH');
      req.flush({ message: 'Success' });
      expect(navSpy).toHaveBeenCalledWith(['/modules']);
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
