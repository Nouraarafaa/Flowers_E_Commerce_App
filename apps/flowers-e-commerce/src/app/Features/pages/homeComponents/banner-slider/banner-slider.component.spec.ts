import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BannerSliderComponent } from './banner-slider.component';

describe('BannerSliderComponent', () => {
  let component: BannerSliderComponent;
  let fixture: ComponentFixture<BannerSliderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BannerSliderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BannerSliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
