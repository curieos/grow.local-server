import { APP_BASE_HREF } from '@angular/common';
import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AreaChartModule, MultiSeries } from '@swimlane/ngx-charts';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

const colors = ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'];

const multi: MultiSeries = [
  {
    name: 'Germany',
    series: [
      {
        name: '2010',
        value: 40632,
        extra: {
          code: 'de'
        }
      },
      {
        name: '2000',
        value: 36953,
        extra: {
          code: 'de'
        }
      },
      {
        name: '1990',
        value: 31476,
        extra: {
          code: 'de'
        }
      }
    ]
  },
  {
    name: 'United States',
    series: [
      {
        name: '2010',
        value: 0,
        extra: {
          code: 'us'
        }
      },
      {
        name: '2000',
        value: 45986,
        extra: {
          code: 'us'
        }
      },
      {
        name: '1990',
        value: 37060,
        extra: {
          code: 'us'
        }
      }
    ]
  },
  {
    name: 'France',
    series: [
      {
        name: '2010',
        value: 36745,
        extra: {
          code: 'fr'
        }
      },
      {
        name: '2000',
        value: 34774,
        extra: {
          code: 'fr'
        }
      },
      {
        name: '1990',
        value: 29476,
        extra: {
          code: 'fr'
        }
      }
    ]
  },
  {
    name: 'United Kingdom',
    series: [
      {
        name: '2010',
        value: 36240,
        extra: {
          code: 'uk'
        }
      },
      {
        name: '2000',
        value: 32543,
        extra: {
          code: 'uk'
        }
      },
      {
        name: '1990',
        value: 26424,
        extra: {
          code: 'uk'
        }
      }
    ]
  }
];

@Component({
  selector: 'app-test-component',
  template: ''
})
class TestComponent {
  data: any = multi;
  colorScheme = {
    domain: colors
  };
}

describe('<ngx-charts-area-chart>', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [NoopAnimationsModule, AreaChartModule],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    });
  });

  describe('basic setup', () => {
    let fixture: ComponentFixture<TestComponent>;
    let de: DebugElement;

    beforeEach(() => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
               <ngx-charts-area-chart
                [animations]="false"
                [view]="[400,800]"
                [scheme]="colorScheme"
                [results]="data">
              </ngx-charts-area-chart>`
        }
      }).compileComponents();
      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      de = fixture.debugElement;
    });

    it('should set the svg width and height', () => {
      const svg = de.nativeElement.querySelector('svg');

      expect(svg.getAttribute('width')).toBe('400');
      expect(svg.getAttribute('height')).toBe('800');
    });

    it('should render 4 area elements', () => {
      const compiled = de.nativeElement;
      expect(compiled.querySelectorAll('path.area').length).toEqual(4);
    });

    it('should match specified colors for area elements', () => {
      const compiled = de.nativeElement;

      const fills = Array.from(compiled.querySelectorAll('path.area')).map((areaElement: Element) =>
        areaElement.getAttribute('fill')
      );
      expect(colors.every(color => fills.includes(color))).toBeTruthy();
    });
  });
});
