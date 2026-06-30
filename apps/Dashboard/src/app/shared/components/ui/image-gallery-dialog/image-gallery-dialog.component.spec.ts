import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ImageGalleryDialogComponent } from './image-gallery-dialog.component';

describe('ImageGalleryDialogComponent', () => {
  let component: ImageGalleryDialogComponent;
  let fixture: ComponentFixture<ImageGalleryDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageGalleryDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ImageGalleryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
