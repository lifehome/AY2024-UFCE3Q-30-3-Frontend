export interface Branch {
  district: string;
  bank_name: string;
  branch_name: string;
  address: string;
  service_hours: string;
  latitude: string;
  longitude: string;
  'barrier-free_access': string;

  /**
   * This is a new property discovered as of 2025-05-06,
   * but nothing is returned in the API response yet.
   */
  'barrier-free_access_code': string | null;
}