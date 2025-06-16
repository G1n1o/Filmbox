import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddScreeningComponent } from './admin-add-screening.component';

describe('AdminAddScreeningComponent', () => {
  let component: AdminAddScreeningComponent;
  let fixture: ComponentFixture<AdminAddScreeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAddScreeningComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminAddScreeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
