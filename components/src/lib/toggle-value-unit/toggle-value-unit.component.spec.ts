import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToggleValueUnitComponent } from './toggle-value-unit.component';

describe('ToggleValueUnitComponent', () => {
  let component: ToggleValueUnitComponent;
  let fixture: ComponentFixture<ToggleValueUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToggleValueUnitComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ToggleValueUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
