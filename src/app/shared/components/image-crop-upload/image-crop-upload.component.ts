import {Component, DestroyRef, ElementRef, EventEmitter, inject, Input, Output, ViewChild} from '@angular/core';
import { ImageCropperComponent, ImageCroppedEvent,OutputFormat } from 'ngx-image-cropper';

import {RequestState} from "../../../api/commons/services-types/request-state";
import {DomSanitizer} from "@angular/platform-browser";
import {MatIcon} from "@angular/material/icon";
import * as img_helpers from "../../helpers/img.helpers";
import {FileEndpoint} from "../../../api/cms/file/services/file.endpoint";
import * as file_store from "../../../store/cms/file/file"
import {FileReference} from "../../../store/commons/file-reference";


@Component({
  selector: 'app-image-crop-upload',
  imports: [
    ImageCropperComponent,
    MatIcon
  ],
  templateUrl: './image-crop-upload.component.html',
  styleUrl: './image-crop-upload.component.scss'
})
export class ImageCropUploadComponent {

  private destroyRef = inject(DestroyRef);

  @Input() imageInfo: img_helpers.ImageInfo

  croppedImage : img_helpers.ImageInfo | undefined
  croppedEvent: ImageCroppedEvent | undefined

  /*
  imageInfo: {
    fileName: any, width: number, height: number,
    croppedImage: any, croppedWidth: number, croppedHeight: number, exifInfo: any }
  */

  imageChangedEvent: any = ''
  uploadProgress: RequestState = {}

  @ViewChild('inputFile') theInputFile: ElementRef | undefined;

  @Input() maintainAspectRatio: boolean = true
  @Input() aspectRatio: number = 4/3
  @Input() format: OutputFormat = 'jpeg'
  @Input() withPreview: boolean = true
  @Input() width: number = 400
  @Input() height: number = 300
  @Input() cropperIsHidden = true
  @Input() category: string = 'any'
  @Output() uploadedFiles = new EventEmitter<FileReference>();

  constructor(
      private domSanitizer: DomSanitizer,
      private fileEndpoint: FileEndpoint,
  ) {
    this.imageInfo = new img_helpers.ImageInfo()
  }

  ngOnInit(): void {

    // let el = document.getElementById('inputFile') as HTMLElement;
    // console.log("eleme", el)
    //el.click()
  }

  onClose(): void {
  }

  /*
  fileChangeEvent(event: any): void {
    this.imageInfo.fileName = event.target?.value.split(/(\\|\/)/g).pop();
    if (this.imageInfo.fileName != "") {
      this.cropperIsHidden = false
    } else {
      this.cropperIsHidden = true
    }
    this.imageChangedEvent = event;
  }
  */

  imageCropped(event: ImageCroppedEvent): void {
    console.log('Cropped Event:', event);

    this.croppedEvent = event;
    // this.imageInfo.croppedImage = event.base64;
    // this.imageInfo.croppedImage = this.domSanitizer.bypassSecurityTrustUrl(event.objectUrl || "");
    this.croppedImage!.fileObj = event.blob
    this.croppedImage!.width = event.width;
    this.croppedImage!.height = event.height;
  }

  imageLoaded(image: any): void {
    console.log('Image Loaded:', image);
    this.croppedImage = new img_helpers.ImageInfo()
    this.croppedImage.width = image.original.size.width;
    this.croppedImage.height = image.original.size.height;

    let exifMetadata: any;
    this.croppedImage.exifInfo = exifMetadata;
  }

  cropperReady(): void {
    // cropper ready
  }

  loadImageFailed(): void {
    // show message
  }

  close(): void {
    this.uploadedFiles.emit()
  }

  upload(): void {

    // const uploadObj = {
    //   name: this.imageInfo.fileName,
    //   // data: this.imageInfo.croppedImage,
    //   contentType: this.getContentType(this.croppedImage!.fileObj),
    //   width: this.croppedImage!.width || null,
    //   height: this.croppedImage!.height || null,
    //   metadata : this.imageInfo.exifInfo
    // };

    const fileDto : file_store.FileDTO = {
      fileName: this.imageInfo.fileName,
      contentType: this.getContentType(this.croppedImage!.fileObj),
      width: this.croppedImage!.width || -1,
      height: this.croppedImage!.height || -1,
      metadata: this.imageInfo.exifInfo,
    }
    // const uploadFormData = new FormData();
    // uploadFormData.append('data', this.imageInfo.croppedImage);

    const formData = new FormData();
    formData.append('file', this.croppedImage!.fileObj, this.imageInfo.fileName)
    formData.append('file-info', JSON.stringify({contentType: this.getContentType(this.croppedImage!.fileObj), width: this.croppedImage!.width || -1, height: this.croppedImage!.height || -1}))
    formData.append( 'metadata', JSON.stringify(this.imageInfo.exifInfo))

    this.fileEndpoint.postFile( (requestName: string, requestState: RequestState) => {}, this.destroyRef, this.category, formData /*this.imageInfo.croppedImage */)
        .subscribe({
              next:   (value) => {
                console.log('Image Uploaded Success:', value);
                this.uploadedFiles.emit(value)
              },
              error: (err : any) => {
                console.log('Image Uploaded Failed:', err);
              }
            }
        );
  }

  // Extract content-type from something like: data:image/jpeg;base64,
  private getContentType(imgData: Blob): string {
    /*
    if (imgData.startsWith('data:')) {
      const ndx = imgData.indexOf(';');
      if (ndx >= 0) {
        return imgData.substring('data:'.length, ndx);
      }
    }*/

    return imgData.type
    //return 'application/octet-stream';
  }

  // Extract base64 data from something like: data:image/jpeg;base64,....
  private getVanillaBase64(imgData: string): string {
    if (imgData.startsWith('data:')) {
      const ndx = imgData.indexOf(';base64,');
      if (ndx >= 0) {
        return imgData.substring(ndx + ';base64,'.length);
      }
    }

    return imgData;
  }

}
