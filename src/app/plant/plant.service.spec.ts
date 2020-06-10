import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, getTestBed, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { Plant } from './plant.model';
import { PlantsService } from './plants.service';

describe('PlantsService', () => {
  let injector: TestBed;
  let service: PlantsService;
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
    service = injector.inject(PlantsService);
    httpMock = injector.inject(HttpTestingController);
    router = injector.inject(Router);
  }));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getPlants', () => {
    it('should return a list of plants', () => {
      const dummyRequest = {
        message: 'Plants Successfully Retrieved',
        plants: [
          { id: '1', name: 'Violets' },
        ],
      };

      service.getPlants();
      service.getPlantsUpdateListener().subscribe((data) => {
        expect(data.plants.length).toEqual(dummyRequest.plants.length);
      });

      const req = httpMock.expectOne(environment.apiURL + '/plants');
      expect(req.request.method).toBe('GET');
      req.flush(dummyRequest);
    });

    it('should return a null array on error', () => {
      service.getPlants();
      service.getPlantsUpdateListener().subscribe((data) => {
        expect(data.plants).toBeFalsy();
      });

      const req = httpMock.expectOne(environment.apiURL + '/plants');
      expect(req.request.method).toBe('GET');
      req.error(new ErrorEvent(''));
    });
  });

  describe('#getPlantInfo', () => {
    it('should return a plant object with info filled out', () => {
      const dummyRequest = {
        message: 'Plant Info Successfully Retrieved',
        plant: { id: '1', name: 'Violets' },
        data: {
          ambientTemperature: [],
          humidity: [],
          soilMoisture: [],
        },
      };

      service.getPlantInfo(dummyRequest.plant.id);
      service.getPlantInfoUpdateListener().subscribe((data) => {
        expect(data.plant.id).toEqual(dummyRequest.plant.id);
        expect(data.plant.name).toEqual(dummyRequest.plant.name);
        expect(data.plant.temperatureHistory).toEqual(dummyRequest.data.ambientTemperature);
        expect(data.plant.humidityHistory).toEqual(dummyRequest.data.humidity);
        expect(data.plant.soilMoistureHistory).toEqual(dummyRequest.data.soilMoisture);
      });

      const req = httpMock.expectOne(environment.apiURL + '/plants/' + dummyRequest.plant.id + '/info');
      expect(req.request.method).toBe('GET');
      req.flush(dummyRequest);
    });

    it('should return a null plant on error', () => {
      service.getPlantInfo('1');
      service.getPlantInfoUpdateListener().subscribe((data) => {
        expect(data.plant).toBeFalsy();
      });

      const req = httpMock.expectOne(environment.apiURL + '/plants/' + '1' + '/info');
      expect(req.request.method).toBe('GET');
      req.error(new ErrorEvent(''));
    });
  });

  describe('#getPlantSettings', () => {
    it('should return a plant object with settings filled out', () => {
      const dummyRequest = {
        message: '',
        plant: { id: '1', name: 'Violets' },
      };

      service.getPlantSettings(dummyRequest.plant.id);
      service.getPlantSettingsUpdateListener().subscribe((data) => {
        expect(data.plant.id).toEqual(dummyRequest.plant.id);
        expect(data.plant.name).toEqual(dummyRequest.plant.name);
      });

      const req = httpMock.expectOne(environment.apiURL + '/plants/' + dummyRequest.plant.id + '/settings');
      expect(req.request.method).toBe('GET');
      req.flush(dummyRequest);
    });

    it('should return a null plant on error', () => {
      service.getPlantSettings('1');
      service.getPlantSettingsUpdateListener().subscribe((data) => {
        expect(data.plant).toBeFalsy();
      });

      const req = httpMock.expectOne(environment.apiURL + '/plants/' + '1' + '/settings');
      expect(req.request.method).toBe('GET');
      req.error(new ErrorEvent(''));
    });
  });

  describe('#addNewPlant', () => {
    it('should navigate away on success', () => {
      const navSpy = spyOn(router, 'navigate');

      service.addNewPlant('Violets', 'ModuleA');

      const req = httpMock.expectOne(environment.apiURL + '/plants');
      expect(req.request.method).toBe('POST');
      req.flush({ message: 'Success' });
      expect(navSpy).toHaveBeenCalledWith(['/plants']);
    });
  });

  describe('#updatePlantSettings', () => {
    it('should navigate away on success', () => {
      const navSpy = spyOn(router, 'navigate');
      const plant = new Plant('1', 'Violets');

      service.updatePlantSettings(plant);

      const req = httpMock.expectOne(environment.apiURL + '/plants/' + plant.id + '/settings');
      expect(req.request.method).toBe('POST');
      req.flush({ message: 'Success' });
      expect(navSpy).toHaveBeenCalledWith(['/plants']);
    });
  });

  afterEach(() => {
    httpMock.verify();
  });
});
