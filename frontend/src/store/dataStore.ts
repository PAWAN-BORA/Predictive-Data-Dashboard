import { create } from "zustand";

type DataItem = {
  id: string;
  value: unknown;
};

type DataStore = {
  data: Record<string, DataItem>;

  // actions
  setItem: (item: DataItem) => void;
  setItems: (items: DataItem[]) => void;
  removeItem: (id: string) => void;
  clear: () => void;
};

export const useDataStore = create<DataStore>((set) => ({
  data: {},

  setItem: (item) =>
    set((state) => ({
      data: {
        ...state.data,
        [item.id]: item,
      },
    })),

  setItems: (items) =>
    set(() => {
      const map: Record<string, DataItem> = {};
      for (const item of items) {
        map[item.id] = item;
      }
      return { data: map };
    }),

  removeItem: (id) =>
    set((state) => {
      const newData = { ...state.data };
      delete newData[id];
      return { data: newData };
    }),

  clear: () => set({ data: {} }),
}));
