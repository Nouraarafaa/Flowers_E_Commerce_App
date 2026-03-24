import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UpdateOccassionComponent } from './updateOccassion.component';

describe('UpdateOccassionComponent', () => {
  let component: UpdateOccassionComponent;
  let fixture: ComponentFixture<UpdateOccassionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateOccassionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateOccassionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
