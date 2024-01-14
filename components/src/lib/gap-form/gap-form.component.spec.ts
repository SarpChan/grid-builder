import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GapFormComponent } from './gap-form.component';

describe('GapFormComponent', () => {
  let component: GapFormComponent;
  let fixture: ComponentFixture<GapFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GapFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(GapFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
