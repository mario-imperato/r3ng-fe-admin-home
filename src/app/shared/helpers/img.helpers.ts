// Deprecated.
// import {ExifData, ExifParserFactory, ExifTags} from "ts-exif-parser";

const semLogContext = "image-info::"
export class ImageInfo {
  fileName: any;
  size: number = 0;
  contentType: string = 'application/octet-stream';
  width: number = 0;
  height: number = 0;
  fileObj: any;
  // exifInfo: ExifTags | undefined
  exifInfo: any;

  constructor(fn: string = '', file: any = undefined) {
    this.fileName = fn;
    if (fn && fn != '') {
      this.fileObj = file;
      this.size = file.size;
      this.contentType = file.type;

      this.getExInfo(file);
    }
  }

  getExInfo(file: File) {
    file.arrayBuffer().then((data) => {
      /* Deprecated
      const exifParser = ExifParserFactory.create(data);
      const exifInfo = exifParser.parse();
      if (exifInfo?.tags) {
        this.exifInfo = exifInfo.tags;
        console.log(semLogContext + 'ex-info', JSON.stringify(this.exifInfo));
      }
      */
    });
  }
}

/* Sample Tags.
{
  "Make": "FUJIFILM",
  "Model": "MX-1700ZOOM",
  "Orientation": 1,
  "XResolution": 72,
  "YResolution": 72,
  "ResolutionUnit": 2,
  "Software": "Digital Camera MX-1700ZOOM Ver1.00",
  "ModifyDate": 967905010,
  "YCbCrPositioning": 2,
  "Copyright": "          ",
  "FNumber": 7,
  "ExposureProgram": 2,
  "ISO": 125,
  "DateTimeOriginal": 967905010,
  "CreateDate": 967905010,
  "CompressedBitsPerPixel": 2,
  "ShutterSpeedValue": 7.4,
  "ApertureValue": 5.6,
  "BrightnessValue": 7.6,
  "ExposureCompensation": 0,
  "MaxApertureValue": 3.3,
  "MeteringMode": 5,
  "Flash": 0,
  "FocalLength": 9.9,
  "ColorSpace": 1,
  "ExifImageWidth": 640,
  "ExifImageHeight": 480,
  "FocalPlaneXResolution": 1087,
  "FocalPlaneYResolution": 1087,
  "FocalPlaneResolutionUnit": 3,
  "SensingMethod": 2,
  "InteropIndex": "R98"
}


{
  "Model": "Nokia 8.3 5G",
  "Software": "00WW_3_380_SP02",
  "Orientation": 1,
  "Make": "HMD Global",
  "GPSImgDirectionRef": "M",
  "GPSLatitudeRef": "N",
  "GPSImgDirection": 56,
  "GPSLatitude": 60.146705555555556,
  "GPSLongitudeRef": "E",
  "GPSLongitude": 24.90677222222222,
  "GPSTimeStamp": [
    11,
    12,
    32
  ],
  "GPSDateStamp": "2022:08:14",
  "FNumber": 2.2,
  "ExposureTime": 0.000541,
  "undefined": "+03:00",
  "FocalLength": 2.75,
  "Flash": 0,
  "ISO": 100,
  "MeteringMode": 2,
  "DateTimeOriginal": 1660486351,
  "WhiteBalance": 0,
  "ApertureValue": 2.2,
  "ExposureProgram": 0
}

{
  "ImageDescription": "                               ",
  "Make": "NIKON",
  "Model": "COOLPIX P6000",
  "Orientation": 1,
  "XResolution": 300,
  "YResolution": 300,
  "ResolutionUnit": 2,
  "Software": "Nikon Transfer 1.1 W",
  "ModifyDate": 1225574111,
  "YCbCrPositioning": 1,
  "GPSLatitudeRef": "N",
  "GPSLatitude": 43.464455,
  "GPSLongitudeRef": "E",
  "GPSLongitude": 11.881478333333334,
  "GPSAltitudeRef": 0,
  "GPSTimeStamp": [
    14,
    57,
    41.37
  ],
  "GPSSatellites": "04",
  "GPSImgDirectionRef": "",
  "GPSMapDatum": "WGS-84   ",
  "GPSDateStamp": "2008:10:23",
  "ExposureTime": 0.01,
  "FNumber": 4.4,
  "ExposureProgram": 2,
  "ISO": 64,
  "DateTimeOriginal": 1224694807,
  "CreateDate": 1224694807,
  "ExposureCompensation": 0,
  "MaxApertureValue": 2.9,
  "MeteringMode": 5,
  "LightSource": 0,
  "Flash": 16,
  "FocalLength": 15,
  "ColorSpace": 1,
  "ExifImageWidth": 640,
  "ExifImageHeight": 480,
  "CustomRendered": 0,
  "ExposureMode": 0,
  "WhiteBalance": 0,
  "DigitalZoomRatio": 0,
  "FocalLengthIn35mmFormat": 70,
  "SceneCaptureType": 0,
  "GainControl": 0,
  "Contrast": 0,
  "Saturation": 0,
  "Sharpness": 0,
  "SubjectDistanceRange": 0,
  "InteropIndex": "R98"
}

make: this.imageInfo.exifInfo?.Make || null,
      model: this.imageInfo.exifInfo?.Model || null,
      orientation: this.imageInfo.exifInfo?.Orientation || null,
      // xres: exifhelpers.exifGetResolution(this.imageInfo.exifInfo?.XResolution),
      // yres: exifhelpers.exifGetResolution(this.imageInfo.exifInfo?.YResolution),
      exifDateTime: this.imageInfo.exifInfo?.DateTimeOriginal || null,
      // gps_position: exifhelpers.exifGetGPSPosition(this.imageInfo.exifInfo),
      gps_satellites: this.imageInfo.exifInfo?.GPSSatellites || null,
      gps_datum: this.imageInfo.exifInfo?.GPSMapDatum || null,
 */


