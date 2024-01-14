import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewportFormComponent } from './viewport-form.component';

describe('ViewportFormComponent', () => {
  let component: ViewportFormComponent;
  let fixture: ComponentFixture<ViewportFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewportFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ViewportFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
