import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledScreeningsComponent } from './scheduled-screenings.component';

describe('ScheduledScreeningComponent', () => {
  let component: ScheduledScreeningsComponent;
  let fixture: ComponentFixture<ScheduledScreeningsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduledScreeningsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScheduledScreeningsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
