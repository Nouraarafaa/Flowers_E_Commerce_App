import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DecorTopComponent } from './decor-top.component';

describe('DecorTopComponent', () => {
  let component: DecorTopComponent;
  let fixture: ComponentFixture<DecorTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DecorTopComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DecorTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
