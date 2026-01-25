import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ShippingAddressesComponent } from './shippingAddresses.component';

describe('ShippingAddressesComponent', () => {
  let component: ShippingAddressesComponent;
  let fixture: ComponentFixture<ShippingAddressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShippingAddressesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ShippingAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
