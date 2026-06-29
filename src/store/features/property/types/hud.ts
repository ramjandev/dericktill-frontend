export interface GeoCode {
  formattedAddress: string;
  latitude: number;
  longitude: number;
  city: string;
  county: string;
  state: string;
  zipCode: string;
}

export interface ZipFMR {
  zipCode: string;
  studio: number;
  oneBedroom: number;
  twoBedroom: number;
  threeBedroom: number;
  fourBedroom: number;
}

export interface FMRData {
  year: number;
  county: string;
  state: string;
  studio: number;
  oneBedroom: number;
  twoBedroom: number;
  threeBedroom: number;
  fourBedroom: number;
  allZipCodeData: ZipFMR[];
  raw: { source: string };
  diagnostics: {
    fipsCode: string;
    entityId: string;
    targetZip: string;
    success: boolean;
  };
}

export interface HudResponse {
  data: {
    geocode: GeoCode;
    fmr: FMRData;
  };
  statusCode: number;
  timestamp: string;
  path: string;
}
