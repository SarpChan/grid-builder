import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValueUnitComponent } from './value-unit.component';

describe('ValueUnitComponent', () => {
  let component: ValueUnitComponent;
  let fixture: ComponentFixture<ValueUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValueUnitComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ValueUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
