import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSheetComponent } from './create-sheet.component';

describe('CreateSheetComponent', () => {
  let component: CreateSheetComponent;
  let fixture: ComponentFixture<CreateSheetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSheetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
