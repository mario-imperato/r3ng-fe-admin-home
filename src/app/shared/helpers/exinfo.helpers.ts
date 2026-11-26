export function exifGetGPSPosition(exifInfo: any): number[] {

  if (!exifInfo)
     return [];

  var exifLong = exifInfo["GPSLongitude"];
  var exifLongRef =exifInfo["GPSLongitudeRef"];
  var exifLat = exifInfo["GPSLatitude"];
  var exifLatRef = exifInfo["GPSLatitudeRef"];
  console.log(`${exifLong} ${exifLongRef}, ${exifLat} ${exifLatRef}`);

  if (!exifLong || !exifLat)
     return [];

  let latitude = (exifLat[0]*1) + (( (exifLat[1]*60) + (exifLat[2]*1) ) / 3600);
  if (exifLatRef == "S") {
    latitude = -latitude;
  }

  var longitude = (exifLong[0]*1) + (( (exifLong[1]*60) + (exifLong[2]*1) ) / 3600);
  if (exifLongRef == "W") {
    longitude = -longitude;
  }

  console.log(`[${longitude},${latitude}]`);
  return [ longitude, latitude ];
}

export function exifGetResolution(resolutionTag: any): number {

  if (!resolutionTag)
     return 0;

  return resolutionTag["numerator"] / resolutionTag["denominator"];
}
