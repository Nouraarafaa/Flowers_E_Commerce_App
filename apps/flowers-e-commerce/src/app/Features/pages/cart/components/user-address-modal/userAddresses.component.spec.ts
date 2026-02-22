import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserAddressesComponent } from './userAddresses.component';

describe('UserAddressesComponent', () => {
  let component: UserAddressesComponent;
  let fixture: ComponentFixture<UserAddressesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserAddressesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(UserAddressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
