import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleLinkComponent } from './module-link.component';

describe('ModuleLinkComponent', () => {
  let component: ModuleLinkComponent;
  let fixture: ComponentFixture<ModuleLinkComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleLinkComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
