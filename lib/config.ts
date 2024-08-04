import { Inventory } from "@/types/inventory";
import axios from "axios";
import { showNotification } from "@/store/thunk-function";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppDispatch } from "@/store";
// created an axios instance for all
export const apiConfig = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// function to fetch all inventories

export const _fetchInventories = createAsyncThunk(
  "store/_fetchInventories",
  async (_, thunkAPI) => {
    const { dispatch } = thunkAPI as { dispatch: AppDispatch };
    try {
      const response = await apiConfig.get("/");
      if (response.status !== 200) {
        throw new Error("Failed to fetch inventories!");
      }
      dispatch(
        showNotification({
          status: "success",
          title: "Success!",
          message: "Successfully fetched inventories!",
        })
      );
      return response.data;
    } catch (error: any) {
      dispatch(
        showNotification({
          status: "error",
          title: "Error!",
          message: "Failed to fetch inventories!",
        })
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
// function to add an inventory
export const addInventory = createAsyncThunk(
  "store/addInventory",
  async (data: Inventory, thunkAPI) => {
    const { dispatch } = thunkAPI as { dispatch: AppDispatch };
    try {
      const response = await apiConfig.post("/", data);
      if (response.status !== 200) {
        throw new Error("Failed to add inventory!");
      }
      dispatch(
        showNotification({
          status: "success",
          title: "Success!",
          message: "Inventory added successfully!",
        })
      );
      return response.data;
    } catch (error: any) {
      dispatch(
        showNotification({
          status: "error",
          title: "Error!",
          message: "Failed to add inventory!",
        })
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// function to delete an inventory
export const deleteInventory = createAsyncThunk(
  "store/deleteInventory",
  async (id: string, thunkAPI) => {
    const { dispatch } = thunkAPI as { dispatch: AppDispatch };
    try {
      const response = await apiConfig.delete(`/${id}`);
      if (response.status !== 200) {
        throw new Error("Failed to delete inventory!");
      }
      dispatch(
        showNotification({
          status: "success",
          title: "Success!",
          message: "Inventory deleted successfully!",
        })
      );
      return { data: response.data, id };
    } catch (error: any) {
      dispatch(
        showNotification({
          status: "error",
          title: "Error!",
          message: "Failed to delete inventory!",
        })
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// function to update an inventory
export const updateInventory = createAsyncThunk(
  "store/updateInventory",
  async (payload: { id: string; data: Inventory }, thunkAPI) => {
    const { dispatch } = thunkAPI as { dispatch: AppDispatch };
    try {
      const response = await apiConfig.put(`/${payload.id}`, payload.data);
      if (response.status !== 200) {
        throw new Error("Failed to update inventory!");
      }
      dispatch(
        showNotification({
          status: "success",
          title: "Success!",
          message: "Inventory updated successfully!",
        })
      );
      return response.data;
    } catch (error: any) {
      dispatch(
        showNotification({
          status: "error",
          title: "Error!",
          message: "Failed to update inventory!",
        })
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// function to fetch a single inventory
export const fetchInventory = createAsyncThunk(
  "store/fetchInventory",
  async (id: string, thunkAPI) => {
    const { dispatch } = thunkAPI as { dispatch: AppDispatch };
    try {
      const response = await apiConfig.get(`/${id}`);
      if (response.status !== 200) {
        throw new Error("Failed to fetch inventory!");
      }
      dispatch(
        showNotification({
          status: "success",
          title: "Success!",
          message: "Inventory fetched successfully!",
        })
      );
      return response.data;
    } catch (error: any) {
      dispatch(
        showNotification({
          status: "error",
          title: "Error!",
          message: "Failed to fetch inventory!",
        })
      );
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
