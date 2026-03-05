import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddCategoryOrOccassionComponent } from './addCategoryOrOccassion.component';

describe('AddCategoryOrOccassionComponent', () => {
  let component: AddCategoryOrOccassionComponent;
  let fixture: ComponentFixture<AddCategoryOrOccassionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCategoryOrOccassionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCategoryOrOccassionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
