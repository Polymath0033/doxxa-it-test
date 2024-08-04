import { InventoryData } from "./inventory";
export type Notification = {
  status: "success" | "error";
  title: string;
  message: string;
};
export type InitialState = {
  inventories: InventoryData[];
  fetchLoading: boolean;
  fetchError: null | string;
  addLoading: boolean;
  addError: null | string;
  updateLoading: boolean;
  updateError: null | string;
  deleteLoading: boolean;
  deleteError: null | string;
  inventory: InventoryData | null;
  fetchSingleLoading: boolean;
  fetchSingleError: null | string;
  notification: Notification | null;
  showNotification: boolean;
};
