import { SQLiteDatabase } from "expo-sqlite";

import {
  CUSTOMER_TABLE,
  GARMENT_TABLE,
  ITEM_TABLE,
  ORDER_TABLE,
  SIZE_MEASUREMENT_TABLE,
  SIZE_TABLE,
} from "./schema";

export async function migrateDbIfNeeded(db: SQLiteDatabase) {
  await db.execAsync("PRAGMA journal_mode = WAL;");

  await db.execAsync(CUSTOMER_TABLE);
  await db.execAsync(GARMENT_TABLE);
  await db.execAsync(SIZE_TABLE);
  await db.execAsync(SIZE_MEASUREMENT_TABLE);
  await db.execAsync(ORDER_TABLE);
  await db.execAsync(ITEM_TABLE);

  // Seed default sizes
  await db.execAsync(`
    INSERT OR IGNORE INTO sizes(name)
    VALUES
      ('XS'),
      ('S'),
      ('M'),
      ('L'),
      ('XL'),
      ('XXL'),
      ('Custom');
  `);

  // Seed default garments
  await db.execAsync(`
  INSERT OR IGNORE INTO garments(name, category)
  VALUES
    -- Tops
    ('T-Shirt', 'Top'),
    ('Polo Shirt', 'Top'),
    ('Shirt', 'Top'),
    ('Blouse', 'Top'),
    ('Tank Top', 'Top'),
    ('Sweater', 'Top'),
    ('Jersey', 'Top'),

    -- Outerwear
    ('Hoodie', 'Outerwear'),
    ('Sweatshirt', 'Outerwear'),
    ('Jacket', 'Outerwear'),
    ('Coat', 'Outerwear'),
    ('Vest', 'Outerwear'),

    -- Bottoms
    ('Skirt', 'Bottom'),
    ('Shorts', 'Bottom'),
    ('Pants', 'Bottom'),
    ('Jeans', 'Bottom'),
    ('Leggings', 'Bottom'),
    ('Joggers', 'Bottom'),

    -- Full Body
    ('Dress', 'Full Body'),
    ('Jumpsuit', 'Full Body'),
    ('Suit', 'Full Body'),
    ('Tracksuit', 'Full Body'),
    ('Uniform', 'Full Body'),
    ('Sleepwear', 'Full Body'),

    -- Undergarments
    ('Underwear', 'Undergarment'),
    ('Socks', 'Undergarment'),

    -- Accessories
    ('Scarf', 'Accessory'),
    ('Hat', 'Accessory'),
    ('Gloves', 'Accessory');
`);
}
