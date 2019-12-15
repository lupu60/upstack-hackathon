export interface ApiResponse {
  code: number;
  error: boolean;
  message: string;
  data: any;
}

export interface SearchMapParam {
  lat_1: number;
  lng_1: number;
  lat_2: number;
  lng_2: number;
}
export interface User {
  id: number;
  created_at: string;
  updated_at: string;
  uid: string;
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  token: string;
  locations: Locations;
}

export interface Locations {
  id: number;
  created_at: string;
  updated_at: string;
  user_uid: string;
  city: string;
  country: string;
  postal_code: string;
  latitude: number;
  longitude: number;
  spare_rooms: number;
  status: number;
  surfable: number;
}
