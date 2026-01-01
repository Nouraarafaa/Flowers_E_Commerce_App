import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WishlistCardComponent } from './wishlistCard.component';

describe('WishlistCardComponent', () => {
  let component: WishlistCardComponent;
  let fixture: ComponentFixture<WishlistCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WishlistCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WishlistCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
