import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddressModalComponent } from './addressModal.component';

describe('AddressModalComponent', () => {
  let component: AddressModalComponent;
  let fixture: ComponentFixture<AddressModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddressModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AddressModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
