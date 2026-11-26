import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCropUploadComponent } from './image-crop-upload.component';

describe('ImageCropUploadComponent', () => {
  let component: ImageCropUploadComponent;
  let fixture: ComponentFixture<ImageCropUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImageCropUploadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImageCropUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
