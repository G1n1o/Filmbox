import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditMovieComponent } from './admin-edit-movie.component';

describe('AdminEditMovieComponent', () => {
  let component: AdminEditMovieComponent;
  let fixture: ComponentFixture<AdminEditMovieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminEditMovieComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminEditMovieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
