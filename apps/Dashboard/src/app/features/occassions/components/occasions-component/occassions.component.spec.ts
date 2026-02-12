import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OccassionsComponent } from './occassions.component';

describe('OccassionsComponent', () => {
  let component: OccassionsComponent;
  let fixture: ComponentFixture<OccassionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OccassionsComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(OccassionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
