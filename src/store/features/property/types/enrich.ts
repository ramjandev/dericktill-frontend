export interface PropertyEnrichResponse {
  data: PropertyData;
  statusCode: number;
  timestamp: string;
  path: string;
}

export interface PropertyData {
  propertyPhoto: string;
  geocode: Geocode;
  fmr: FMR;
  comps: Comps;
  crime: Crime;
}

export interface Geocode {
  formattedAddress: string;
  latitude: number;
  longitude: number;
  city: string;
  county: string;
  state: string;
  zipCode: string;
  propertyPhoto: string;
}

export interface FMR {
  county: string;
  state: string;
  year: number;
  rents: {
    studio: number;
    oneBedroom: number;
    twoBedroom: number;
    threeBedroom: number;
    fourBedroom: number;
  };
}

export interface Comps {
  rental: RentalComp[];
  sold: SoldComp[];
  estimates: {
    rentEstimate: number;
    valueEstimate: number | null;
  };
}

export interface RentalComp {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  bedrooms: number;
  bathrooms: number;
  squareFootage?: number;
  rent: number;
  listedDate: string;
  propertyType: string;
}

export interface SoldComp {
  id: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  bedrooms: number;
  bathrooms: number;
  squareFootage: number;
  price: number;
  pricePerSqFt: number;
  soldDate: string;
  propertyType: string;
}

export interface Crime {
  crimeScore: number;
  riskLabel: string;
  totalIncidents: number;
  areaName: string;
  population: number | null;
  dataSource: string;
  crimesByType: CrimeType[];
  areaSummary: string;
  incidents: CrimeIncident[];
}

export interface CrimeType {
  type: string;
  count: number;
  percentage: number;
}

export interface CrimeIncident {
  type: string;
  description: string;
}

export type AddressRequest = {
  address: string;
};
