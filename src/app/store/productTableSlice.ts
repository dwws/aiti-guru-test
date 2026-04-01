import type { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

export type ProductSortField = "title" | "price" | "rating";
export type ProductSortOrder = "asc" | "desc";

interface ProductTableState {
  sortBy: ProductSortField | null;
  order: ProductSortOrder;
  activePage: number;
  searchInput: string;
  searchQuery: string;
}

const initialState: ProductTableState = {
  sortBy: null,
  order: "asc",
  activePage: 1,
  searchInput: "",
  searchQuery: "",
};

const productTableSlice = createSlice({
  name: "productTable",
  initialState,
  reducers: {
    setSorting: (
      state,
      action: PayloadAction<{
        sortBy: ProductSortField;
        order: ProductSortOrder;
      }>,
    ) => {
      state.sortBy = action.payload.sortBy;
      state.order = action.payload.order;
      state.activePage = 1;
    },
    setActivePage: (state, action: PayloadAction<number>) => {
      state.activePage = action.payload;
    },
    setSearchInput: (state, action: PayloadAction<string>) => {
      state.searchInput = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.activePage = 1;
    },
    resetTableState: () => initialState,
  },
});

export const {
  setSorting,
  setActivePage,
  setSearchInput,
  setSearchQuery,
  resetTableState,
} = productTableSlice.actions;
export default productTableSlice.reducer;
