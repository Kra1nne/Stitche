import { Garment } from "@/models/Garment";
import { SQLiteDatabase } from "expo-sqlite";

export class GarmentRepository {
  constructor(private db: SQLiteDatabase) {}

  async getAll() {
    return await this.db.getAllAsync<Garment>(
      "SELECT * FROM garments ORDER BY id DESC",
    );
  }
}
