import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, getTestBed, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { ModulesService } from './modules.service';

describe('ModulesService', () => {
  let injector: TestBed;
  let service: ModulesService;
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
    service = injector.inject(ModulesService);
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
        expect(data.modules).toBeFalsy();
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
        expect(data.module).toBeFalsy();
      });

      const req = httpMock.expectOne(environment.apiURL + '/modules/' + '1' + '/info');
      expect(req.request.method).toBe('GET');
      req.error(new ErrorEvent(''));
    });
  });
});
