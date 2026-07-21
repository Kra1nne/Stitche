import { Garment } from "@/models/Garment";
import { SQLiteDatabase } from "expo-sqlite";

export class GarmentRepository {
  constructor(private db: SQLiteDatabase) {}

  async getAll() {
    return await this.db.getAllAsync<Garment>(
      "SELECT * FROM garments ORDER BY id DESC",
    );
  }
  // async addData(garment: Garment) {
  //   const result = await this.db.runAsync(
  //     `INSERT INTO garments (name, category)
  //      VALUES (?, ?)`,
  //     [garment.name ?? null, garment.category ?? null],
  //   );

  //   return result.lastInsertRowId;
  // }

  // async updateData(garment: Garment) {
  //   if (!garment.id) {
  //     throw new Error("Garment ID is required for update.");
  //   }
  //   return await this.db.runAsync(
  //     `UPDATE garments
  //      SET
  //         name = ?,
  //         category,
  //         `
  //   )

  // }
}
