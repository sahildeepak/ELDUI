import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateLearningPathComponent } from './create-learning-path.component';

describe('CreateLearningPathComponent', () => {
  let component: CreateLearningPathComponent;
  let fixture: ComponentFixture<CreateLearningPathComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateLearningPathComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateLearningPathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
