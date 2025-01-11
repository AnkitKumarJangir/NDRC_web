import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingSlipsComponent } from './loading-slips.component';

describe('LoadingSlipsComponent', () => {
  let component: LoadingSlipsComponent;
  let fixture: ComponentFixture<LoadingSlipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LoadingSlipsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LoadingSlipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
