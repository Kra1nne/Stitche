import { Item } from "@/models/Item";
import { SQLiteDatabase } from "expo-sqlite";

export class ItemRepository {
  constructor(private db: SQLiteDatabase) {}

  async getAll() {
    return await this.db.getAllAsync<Item>(
      "SELECT * FROM items ORDER BY id DESC",
    );
  }

  async addDta(item: Item) {
    const result = await this.db.runAsync(
      `INSERT INTO items (item_id, garment_id, size_id, material, unit_price, remarks, url)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        item.item_id ?? null,
        item.garment_id ?? null,
        item.size_id ?? null,
        item.material ?? null,
        item.unit_price ?? 0,
        item.remarks ?? null,
        item.url ?? null,
      ],
    );
  }
}
