import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Searchable } from '../../searchable';
import { ListViewComponent } from './list-view.component';
import { Plant } from '../../plant/plant.model';
import { Observable, of } from 'rxjs';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

describe('ListViewComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListViewComponent,
        TestHostComponent
      ],
      imports: [
        NgbModule,
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create a new list view', () => {
    expect(component.listViewComponent).toBeTruthy();
  });

  describe('#getItemsByName', () => {
    it('should filter by name', () => {
      component.listViewComponent._listItems = [
        new Plant('1', 'Violets'),
        new Plant('2', 'Squash'),
        new Plant('3', 'Marigolds'),
      ];

      const listItems = component.listViewComponent.getItemsByName('o');

      expect(listItems).toEqual([
        component.listViewComponent.listItems[0],
        component.listViewComponent.listItems[2],
      ]);
    });
  });

  describe('#search', () => {
    it('should filter by name', () => {
      component.listViewComponent._listItems = [
        new Plant('1', 'Violets'),
        new Plant('2', 'Squash'),
        new Plant('3', 'Marigolds'),
      ];

      const query: Observable<string> = of('o');

      const observableResults = component.listViewComponent.search(query);

      let results;

      observableResults.subscribe((data) => {
        results = data;
      });

      expect(results).toEqual([
        component.listViewComponent.listItems[0],
        component.listViewComponent.listItems[2],
      ]);
    });
  });

  describe('#formatter', () => {
    it('should return the name of the object', () => {
      expect(component.listViewComponent.formatter(new Plant('1', 'Violets'))).toEqual('Violets');
    });
  });

  @Component({
    selector: 'app-host-component',
    template: '<app-list-view [_listItems]="listItems" #list></app-list-view>'
  })
  class TestHostComponent {
    @ViewChild('list')
    public listViewComponent: ListViewComponent<Searchable>;
    public listItems = [];
  }
});
