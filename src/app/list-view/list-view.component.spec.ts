import { Component, ViewChild } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Listable } from '../listable';
import { ListViewComponent } from './list-view.component';

describe('ListViewComponent', () => {
  let component: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListViewComponent, TestHostComponent]
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

  @Component({
    selector: 'app-host-component',
    template: '<app-list-view [listItems]="listItems" #list></app-list-view>'
  })
  class TestHostComponent {
    @ViewChild('list')
    public listViewComponent: ListViewComponent<Listable>;
    public listItems = [];
  }
});
