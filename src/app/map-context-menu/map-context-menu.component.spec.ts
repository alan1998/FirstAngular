import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapContextMenuComponent } from './map-context-menu.component';

describe('MapContextMenuComponent', () => {
  let component: MapContextMenuComponent;
  let fixture: ComponentFixture<MapContextMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapContextMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapContextMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
