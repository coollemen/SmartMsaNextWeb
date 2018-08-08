import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DutyConfigComponent } from './duty-config.component';

describe('DutyConfigComponent', () => {
  let component: DutyConfigComponent;
  let fixture: ComponentFixture<DutyConfigComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DutyConfigComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyConfigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
