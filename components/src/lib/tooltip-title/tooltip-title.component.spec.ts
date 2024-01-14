import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TooltipTitleComponent } from './tooltip-title.component';

describe('TooltipTitleComponent', () => {
  let component: TooltipTitleComponent;
  let fixture: ComponentFixture<TooltipTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TooltipTitleComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TooltipTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
