import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpsertCategoryAndOccassionComponent } from './upsertCategoryAndOccassion.component';

describe('UpsertCategoryAndOccassionComponent', () => {
  let component: UpsertCategoryAndOccassionComponent;
  let fixture: ComponentFixture<UpsertCategoryAndOccassionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpsertCategoryAndOccassionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UpsertCategoryAndOccassionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
