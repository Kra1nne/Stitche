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
}
