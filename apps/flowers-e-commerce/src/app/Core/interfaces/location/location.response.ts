export interface locationResponse {
  results: Result[];
  query: Query;
}

export interface Query {
  lat: number;
  lon: number;
  plus_code: string;
}

export interface Result {
  datasource: Datasource;
  other_names: Othernames;
  country: string;
  country_code: string;
  state: string;
  county: string;
  city: string;
  postcode: string;
  iso3166_2: string;
  lon: number;
  lat: number;
  distance: number;
  result_type: string;
  formatted: string;
  address_line1: string;
  address_line2: string;
  category: string;
  timezone: Timezone;
  plus_code: string;
  plus_code_short: string;
  rank: Rank;
  place_id: string;
  bbox: Bbox;
}

export interface Bbox {
  lon1: number;
  lat1: number;
  lon2: number;
  lat2: number;
}

export interface Rank {
  importance: number;
  popularity: number;
}

export interface Timezone {
  name: string;
  offset_STD: string;
  offset_STD_seconds: number;
  offset_DST: string;
  offset_DST_seconds: number;
}

export interface Othernames {
  name: string;
  'name:ar': string;
  'name:bn': string;
  'name:et': string;
  'name:fa': string;
  'name:fr': string;
  'name:he': string;
  'name:hi': string;
  'name:ko': string;
  'name:ks': string;
  'name:ku': string;
  'name:ml': string;
  'name:ru': string;
  'name:sr': string;
  'name:tr': string;
  'name:uk': string;
  'name:ur': string;
  'name:zh': string;
  'name:arz': string;
  'name:azb': string;
  'name:ckb': string;
  'name:mzn': string;
  'name:pnb': string;
}

export interface Datasource {
  sourcename: string;
  attribution: string;
  license: string;
  url: string;
}