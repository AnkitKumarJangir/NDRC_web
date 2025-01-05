import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLoadingSlipComponent } from './create-loading-slip.component';

describe('CreateLoadingSlipComponent', () => {
  let component: CreateLoadingSlipComponent;
  let fixture: ComponentFixture<CreateLoadingSlipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateLoadingSlipComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateLoadingSlipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
