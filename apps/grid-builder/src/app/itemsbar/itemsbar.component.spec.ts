import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ItemsbarComponent } from './itemsbar.component';

describe('ItemsbarComponent', () => {
  let component: ItemsbarComponent;
  let fixture: ComponentFixture<ItemsbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemsbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ItemsbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
