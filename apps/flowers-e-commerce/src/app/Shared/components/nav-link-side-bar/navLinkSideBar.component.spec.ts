import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavLinkSideBarComponent } from './navLinkSideBar.component';

describe('NavLinkSideBarComponent', () => {
  let component: NavLinkSideBarComponent;
  let fixture: ComponentFixture<NavLinkSideBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavLinkSideBarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NavLinkSideBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
