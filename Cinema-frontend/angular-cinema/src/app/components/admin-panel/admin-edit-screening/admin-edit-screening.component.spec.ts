import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDeleteScreeningComponent } from './admin-edit-screening.component';

describe('AdminDeleteScreeningComponent', () => {
  let component: AdminDeleteScreeningComponent;
  let fixture: ComponentFixture<AdminDeleteScreeningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDeleteScreeningComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdminDeleteScreeningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
