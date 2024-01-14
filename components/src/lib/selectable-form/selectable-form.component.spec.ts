import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectableFormComponent } from './selectable-form.component';

describe('SelectableFormComponent', () => {
  let component: SelectableFormComponent;
  let fixture: ComponentFixture<SelectableFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectableFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectableFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
