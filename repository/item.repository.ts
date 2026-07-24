import { Item } from "@/models/Item";
import { SQLiteDatabase } from "expo-sqlite";

export class ItemRepository {
  constructor(private db: SQLiteDatabase) {}

  async getAll() {
    return await this.db.getAllAsync<Item>(
      "SELECT * FROM items ORDER BY id DESC",
    );
  }
  async getPreviewItems() {
    return await this.db.getAllAsync<Item>(
      "SELECT * FROM items ORDER BY id DESC LIMIT 5",
    );
  }

  async addData(item: Item) {
    const existingCustomer = await this.db.getFirstAsync<{ id: number }>(
      "SELECT id FROM customers WHERE full_name = ? LIMIT 1",
      ["Guest"],
    );

    const customerId =
      existingCustomer?.id ??
      Number(
        (
          await this.db.runAsync(
            "INSERT INTO customers (full_name) VALUES (?)",
            ["Guest"],
          )
        ).lastInsertRowId,
      );

    const orderResult = await this.db.runAsync(
      `INSERT INTO orders (customer_id, quantity, total, status)
       VALUES (?, ?, ?, ?)`,
      [customerId, 1, 0, "Pending"],
    );

    const orderId = Number(orderResult.lastInsertRowId);

    return await this.db.runAsync(
      `INSERT INTO items (item_id, garment_id, size_id, material, unit_price, remarks, url)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [
        orderId,
        item.garment_id ?? null,
        item.size_id ?? null,
        item.material ?? null,
        item.unit_price ?? 0,
        item.remarks ?? null,
        item.url ?? null,
      ],
    );
  }

  async deleteData(id: number) {
    return await this.db.runAsync("DELETE FROM items WHERE id = ?", [id]);
  }

  async updateData(id: number, item: Partial<Item>) {
    const updates: string[] = [];
    const values: Array<string | number | null> = [];

    if (item.garment_id !== undefined) {
      updates.push("garment_id = ?");
      values.push(item.garment_id);
    }

    if (item.size_id !== undefined) {
      updates.push("size_id = ?");
      values.push(item.size_id);
    }

    if (item.material !== undefined) {
      updates.push("material = ?");
      values.push(item.material);
    }

    if (item.unit_price !== undefined) {
      updates.push("unit_price = ?");
      values.push(item.unit_price);
    }

    if (item.remarks !== undefined) {
      updates.push("remarks = ?");
      values.push(item.remarks);
    }

    if (item.url !== undefined) {
      updates.push("url = ?");
      values.push(item.url);
    }

    if (updates.length === 0) {
      return null;
    }

    values.push(id);

    return await this.db.runAsync(
      `UPDATE items SET ${updates.join(", ")} WHERE id = ?`,
      values,
    );
  }
}
