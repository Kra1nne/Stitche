import { Customer } from "@/models/Customer";
import { SQLiteDatabase } from "expo-sqlite";

export class CustomerRepository {
  constructor(private db: SQLiteDatabase) {}

  async getAll() {
    return await this.db.getAllAsync<Customer>(
      "SELECT * FROM customers ORDER BY id DESC",
    );
  }
  async addCustomer(customer: Customer) {
    return await this.db.runAsync(
      "INSERT INTO customers (full_name, phone_number, address, notes) VALUES (?, ?, ?, ?)",
      [
        customer.full_name,
        customer.phone_number ?? null,
        customer.address ?? null,
        customer.notes ?? null,
      ],
    );
  }
  async updateData(id: number, item: Partial<Customer>) {
    const updates: string[] = [];
    const values: Array<string | number | null> = [];

    if (item.full_name !== undefined) {
      updates.push("full_name = ?");
      values.push(item.full_name);
    }

    if (item.phone_number !== undefined) {
      updates.push("phone_number = ?");
      values.push(item.phone_number);
    }

    if (item.address !== undefined) {
      updates.push("address = ?");
      values.push(item.address);
    }

    if (item.notes !== undefined) {
      updates.push("notes = ?");
      values.push(item.notes);
    }

    if (updates.length === 0) {
      return null;
    }

    values.push(id);

    return await this.db.runAsync(
      `UPDATE customers SET ${updates.join(", ")} WHERE id = ?`,
      values,
    );
  }
}
