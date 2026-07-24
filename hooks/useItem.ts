import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useEffect, useMemo, useState } from "react";

import { Item } from "@/models";
import { ItemRepository } from "@/repository/item.repository";

export function useItems() {
  const db = useSQLiteContext();

  const repository = useMemo(() => {
    return new ItemRepository(db);
  }, [db]);

  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);

  const loadItems = useCallback(async () => {
    setLoading(true);

    try {
      const data = await repository.getAll();
      setItems(data);
    } finally {
      setLoading(false);
    }
  }, [repository]);

  const addItem = useCallback(
    async (item: Item) => {
      setLoading(true);

      try {
        await repository.addData(item);
        await loadItems();
      } finally {
        setLoading(false);
      }
    },
    [loadItems, repository],
  );

  const updateItem = useCallback(
    async (id: number, item: Partial<Item>) => {
      setLoading(true);

      try {
        await repository.updateData(id, item);
        await loadItems();
      } finally {
        setLoading(false);
      }
    },
    [loadItems, repository],
  );

  const deleteItem = useCallback(
    async (id: number) => {
      setLoading(true);

      try {
        await repository.deleteData(id);
        await loadItems();
      } finally {
        setLoading(false);
      }
    },
    [loadItems, repository],
  );

  const previewItems = useCallback(async () => {
    setLoading(true);
    try {
      const data = await repository.getPreviewItems();
      setItems(data);
    } finally {
      setLoading(false);
    }
  }, [repository]);

  useEffect(() => {
    void loadItems();
  }, [loadItems]);

  return {
    Items: items,
    loading,
    loadItems,
    previewItems,
    addItem,
    updateItem,
    deleteItem,
  };
}
