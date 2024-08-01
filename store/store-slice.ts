import { Inventory, InventoryData } from "@/types/inventory";
import { createSlice } from "@reduxjs/toolkit";
import {
  _fetchInventories,
  addInventory,
  updateInventory,
  deleteInventory,
  fetchInventory,
} from "@/lib/config";
type InitialState = {
  inventories: InventoryData[];
  isLoading: boolean;
  error: null | string;
  addInventoryModal: boolean;
};
const initialState: InitialState = {
  inventories: [],
  isLoading: false,
  error: null,
  addInventoryModal: false,
};
const storeSlice = createSlice({
  name: "store",
  initialState: initialState,
  reducers: {
    toggleAddInventoryModal(state) {
      state.addInventoryModal = !state.addInventoryModal;
    },
  },
  extraReducers(builder) {
    builder.addCase(_fetchInventories.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(_fetchInventories.fulfilled, (state, action) => {
      state.isLoading = false;
      state.inventories = action.payload;
    });
    builder.addCase(_fetchInventories.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? null;
    });
    builder.addCase(addInventory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addInventory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.inventories.push(action.payload);
    });
    builder.addCase(addInventory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? null;
    });
    builder.addCase(updateInventory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateInventory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.inventories = state.inventories.map((inventory) =>
        inventory.id === action.payload.id ? action.payload : inventory
      );
    });
    builder.addCase(updateInventory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? null;
    });
    builder.addCase(deleteInventory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(deleteInventory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.inventories = state.inventories.filter(
        (inventory) => inventory.id !== action.payload.id
      );
    });
    builder.addCase(deleteInventory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? null;
    });
    builder.addCase(fetchInventory.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchInventory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.inventories = action.payload;
    });
    builder.addCase(fetchInventory.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message ?? null;
    });
  },
});
export const storeActions = storeSlice.actions;
export default storeSlice;
/* */
