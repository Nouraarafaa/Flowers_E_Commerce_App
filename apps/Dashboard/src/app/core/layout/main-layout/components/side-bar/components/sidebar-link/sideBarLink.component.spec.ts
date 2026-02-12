import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SideBarLinkComponent } from './sideBarLink.component';

describe('SideBarLinkComponent', () => {
  let component: SideBarLinkComponent;
  let fixture: ComponentFixture<SideBarLinkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SideBarLinkComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SideBarLinkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
