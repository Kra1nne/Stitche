import { SizeMeasurement } from "@/models/SizeMeasurement";
import { SQLiteDatabase } from "expo-sqlite";

export class SizeMeasurementRepository {
  constructor(private db: SQLiteDatabase) {}

  async getAll() {
    return await this.db.getAllAsync<SizeMeasurement>(
      "SELECT * FROM size_measurements ORDER BY id DESC",
    );
  }
}
