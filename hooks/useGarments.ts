import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useMemo, useState } from "react";

import { Garment } from "@/models";
import { GarmentRepository } from "@/repository/garment.repository";

export function useGarments() {
  const db = useSQLiteContext();

  const repository = useMemo(() => {
    return new GarmentRepository(db);
  }, [db]);

  const [garments, setGarments] = useState<Garment[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadGarments() {
    setLoading(true);

    const data = await repository.getAll();

    setGarments(data);

    setLoading(false);
  }

  useEffect(() => {
    loadGarments();
  }, []);

  return {
    garments,
    loading,

    loadGarments,
  };
}
