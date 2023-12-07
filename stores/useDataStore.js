import { create } from "zustand";

export const useDataStore = create((set) => ({
  data: [],
  originalData: [],
  nameSearch: "",
  filters: [],
  selectedFilterValue: "",
  setSelectedFilterValue: (newSelectedFilterValue) =>
    set((state) => ({ selectedFilterValue: newSelectedFilterValue })),
  setData: (newData) => set((state) => ({ data: newData })),
  setOriginalData: (newOriginalData) =>
    set((state) => ({ originalData: newOriginalData })),
  setNameSearch: (newNameSearch) =>
    set((state) => ({ nameSearch: newNameSearch })),
  setFilters: (newFilters) => set((state) => ({ filters: newFilters })),
}));
