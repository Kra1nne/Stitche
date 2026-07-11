export interface Order {
  id?: number;

  customer_id: number;

  order_date?: string;

  due_date?: string;

  status?: string;

  quantity?: string;

  total?: number;

  notes?: string;

  created_at?: string;
}
