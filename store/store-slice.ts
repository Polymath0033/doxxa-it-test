import { Inventory, InventoryData } from "@/types/inventory";
import { InitialState } from "@/types/redux";
import { createSlice } from "@reduxjs/toolkit";
import {
  _fetchInventories,
  addInventory,
  updateInventory,
  deleteInventory,
  fetchInventory,
} from "@/lib/config";

const initialState: InitialState = {
  inventories: [],
  fetchLoading: false,
  fetchError: null,
  addLoading: false,
  addError: null,
  updateLoading: false,
  updateError: null,
  deleteLoading: false,
  deleteError: null,
  inventory: null,
  fetchSingleLoading: false,
  fetchSingleError: null,
  notification: null,
  showNotification: false,
};
const storeSlice = createSlice({
  name: "store",
  initialState: initialState,
  reducers: {
    _showNotification(state, action) {
      state.showNotification = true;
      state.notification = action.payload;
    },
    hideNotification(state) {
      state.notification = null;
      state.showNotification = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(_fetchInventories.pending, (state) => {
      state.fetchLoading = true;
    });
    builder.addCase(_fetchInventories.fulfilled, (state, action) => {
      state.fetchLoading = false;
      state.inventories = action.payload;
    });
    builder.addCase(_fetchInventories.rejected, (state, action) => {
      state.fetchLoading = false;
      console.log(action);
      // state.fetchError = action.error.message ?? null;
      state.fetchError = "Failed to fetch inventories!";
    });
    builder.addCase(addInventory.pending, (state) => {
      state.addLoading = true;
    });
    builder.addCase(addInventory.fulfilled, (state, action) => {
      state.addLoading = false;
      state.inventories.push(action.payload);
    });
    builder.addCase(addInventory.rejected, (state, action) => {
      state.addLoading = false;
      // state.addError = action.error.message ?? null;
      state.addError = "Failed to add inventory!";
    });
    builder.addCase(updateInventory.pending, (state) => {
      state.updateLoading = true;
    });
    builder.addCase(updateInventory.fulfilled, (state, action) => {
      state.updateLoading = false;
      state.inventories = state.inventories.map((inventory) =>
        inventory.id === action.payload.id ? action.payload : inventory
      );
    });
    builder.addCase(updateInventory.rejected, (state, action) => {
      state.updateLoading = false;
      // state.updateError = action.error.message ?? null;
      state.updateError = "Failed to update this inventory!";
    });
    builder.addCase(deleteInventory.pending, (state) => {
      state.deleteLoading = true;
    });
    builder.addCase(deleteInventory.fulfilled, (state, action) => {
      state.deleteLoading = false;
      state.inventories = state.inventories.filter(
        (inventory) => action.payload && inventory.id !== action.payload.id
      );
    });
    builder.addCase(deleteInventory.rejected, (state, action) => {
      state.deleteLoading = false;
      // state.deleteError = action.error.message ?? null;
      state.deleteError = "Failed to delete this inventory!";
    });

    builder.addCase(fetchInventory.pending, (state) => {
      state.fetchSingleLoading = true;
    });
    builder.addCase(fetchInventory.fulfilled, (state, action) => {
      state.fetchSingleLoading = false;

      state.inventory = action.payload;
    });
    builder.addCase(fetchInventory.rejected, (state, action) => {
      state.fetchSingleLoading = false;
      //state.fetchSingleError = action.error.message ?? null;
      state.fetchSingleError = "Failed to fetch this inventory!";
    });
  },
});
export const storeActions = storeSlice.actions;
export default storeSlice;
/* */
