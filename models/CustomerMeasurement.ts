export interface CustomerMeasurement {
  id?: number;

  customer_id: number;

  chest?: number;
  arm_length?: number;
  shoulder?: number;
  armscye?: number;
  neck_size?: number;
  back_width?: number;
  waist?: number;
  front_shoulder_to_waist?: number;
  hip?: number;
  waist_to_knee?: number;
  crotch_depth?: number;
  body_rise?: number;
  waist_to_floor?: number;
  nape_to_waist?: number;
  bust?: number;

  created_at?: string;
}
