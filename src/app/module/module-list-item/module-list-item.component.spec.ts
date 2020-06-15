import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleListItemComponent } from './module-list-item.component';

describe('ModuleListItemComponent', () => {
  let component: ModuleListItemComponent;
  let fixture: ComponentFixture<ModuleListItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleListItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
