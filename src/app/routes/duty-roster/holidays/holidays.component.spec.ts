import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DutyRosterHolidaysComponent } from './holidays.component';

describe('DutyRosterHolidaysComponent', () => {
  let component: DutyRosterHolidaysComponent;
  let fixture: ComponentFixture<DutyRosterHolidaysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DutyRosterHolidaysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DutyRosterHolidaysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
