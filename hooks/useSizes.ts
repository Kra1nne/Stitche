// hooks/useSizes.ts

import { useSQLiteContext } from "expo-sqlite";
import { useEffect, useMemo, useState } from "react";

import { Size } from "@/models";
import { SizeRepository } from "@/repository/size.repository";

export function useSizes() {
  const db = useSQLiteContext();

  const repository = useMemo(() => {
    return new SizeRepository(db);
  }, [db]);

  const [sizes, setSizes] = useState<Size[]>([]);
  const [loading, setLoading] = useState(false);

  async function loadSizes() {
    setLoading(true);

    const data = await repository.getAll();

    setSizes(data);

    setLoading(false);
  }

  async function addSize(name: string) {
    await repository.create({
      name,
    });

    await loadSizes();
  }

  useEffect(() => {
    loadSizes();
  }, []);

  return {
    sizes,
    loading,

    loadSizes,
    addSize,
  };
}
