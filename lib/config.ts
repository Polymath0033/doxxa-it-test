import { Inventory } from "@/types/inventory";
import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
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
  async () => {
    const response = await apiConfig.get("/");
    return response.data;
  }
);
// function to add an inventory
export const addInventory = createAsyncThunk(
  "store/addInventory",
  async (data: Inventory) => {
    const response = await apiConfig.post("/", data);
    return response.data;
  }
);

// function to delete an inventory
export const deleteInventory = createAsyncThunk(
  "store/deleteInventory",
  async (id: string) => {
    const response = await apiConfig.delete(`/${id}`);
    return { data: response.data, id };
  }
);

// function to update an inventory
export const updateInventory = createAsyncThunk(
  "store/updateInventory",
  async (payload: { id: string; data: Inventory }) => {
    const response = await apiConfig.put(`/${payload.id}`, payload.data);
    return response.data;
  }
);

// function to fetch a single inventory
export const fetchInventory = createAsyncThunk(
  "store/fetchInventory",
  async (id: string) => {
    const response = await apiConfig.get(`/${id}`);
    return response.data;
  }
);
