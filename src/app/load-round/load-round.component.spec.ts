import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadRoundComponent } from './load-round.component';

describe('LoadRoundComponent', () => {
  let component: LoadRoundComponent;
  let fixture: ComponentFixture<LoadRoundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoadRoundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoadRoundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
