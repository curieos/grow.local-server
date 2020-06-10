import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { async, getTestBed, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { environment } from 'src/environments/environment';
import { PlantsService } from './plants.service';

describe('PlantsService', () => {
  let injector: TestBed;
  let service: PlantsService;
  let httpMock: HttpTestingController;

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
  });

  describe('#getPlantInfo', () => {
    it('should return info about a plant', () => {
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
  });

  afterEach(() => {
    httpMock.verify();
  });
});
