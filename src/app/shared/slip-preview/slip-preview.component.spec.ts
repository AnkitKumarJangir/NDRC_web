import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlipPreviewComponent } from './slip-preview.component';

describe('SlipPreviewComponent', () => {
  let component: SlipPreviewComponent;
  let fixture: ComponentFixture<SlipPreviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SlipPreviewComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SlipPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
