import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddOccassionComponent } from './addOccassion.component';

describe('AddOccassionComponent', () => {
  let component: AddOccassionComponent;
  let fixture: ComponentFixture<AddOccassionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddOccassionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddOccassionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
