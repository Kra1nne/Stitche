export interface Item {
  id?: number;

  order_id: number;

  garment_id: number;

  size_id?: number;

  customer_measurement_id?: number;

  quantity: number;

  material?: string;

  unit_price: number;

  subtotal: number;

  remarks?: string;
}
