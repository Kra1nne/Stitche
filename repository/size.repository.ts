import { Size } from "@/models/Size";
import { SQLiteDatabase } from "expo-sqlite";

export class SizeRepository {
  constructor(private db: SQLiteDatabase) {}

  async getAll() {
    return await this.db.getAllAsync<Size>(
      "SELECT * FROM sizes ORDER BY id DESC",
    );
  }

  async create(size: Size) {
    await this.db.runAsync(
      `
        INSERT INTO sizes
        (
            name,
            created_at
        )
        VALUES (?, ?,)
        `,
      [size.name ?? null, size.created_at ?? null],
    );
  }
}
