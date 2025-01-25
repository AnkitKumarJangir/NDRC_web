import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEntriesComponent } from './create-entries.component';

describe('CreateEntriesComponent', () => {
  let component: CreateEntriesComponent;
  let fixture: ComponentFixture<CreateEntriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateEntriesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
