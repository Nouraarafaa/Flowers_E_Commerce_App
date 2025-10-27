import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DecorBottomComponent } from './decor-bottom.component';

describe('DecorBottomComponent', () => {
  let component: DecorBottomComponent;
  let fixture: ComponentFixture<DecorBottomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecorBottomComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DecorBottomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
