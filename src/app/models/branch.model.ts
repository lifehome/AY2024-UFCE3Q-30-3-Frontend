export interface Branch {
  district: string;
  bank_name: string;
  branch_name: string;
  address: string;
  service_hours: string;
  latitude: string;
  longitude: string;
  'barrier-free_access': string;
  'barrier-free_access_code': string | null;
}