export interface Customer {
  id?: number;

  full_name: string;
  phone_number?: string;
  address?: string;
  notes?: string;

  created_at?: string;
  updated_at?: string;
  deleted_at?: string;
}
