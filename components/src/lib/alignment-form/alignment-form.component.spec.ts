import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AlignmentFormComponent } from './alignment-form.component';

describe('AlignmentFormComponent', () => {
  let component: AlignmentFormComponent;
  let fixture: ComponentFixture<AlignmentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AlignmentFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AlignmentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
