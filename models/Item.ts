export interface Item {
  id?: number;

  item_id: number;

  garment_id: number;

  size_id?: number;

  material?: string;

  unit_price: number;

  remarks?: string;

  url?: string;

  created_at: string;
}
