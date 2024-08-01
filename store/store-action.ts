import { _fetchInventories } from "@/lib/config";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { Inventory } from "@/types/inventory";
import { storeActions } from "./store-slice";
import { Dispatch } from "redux";

export const fetchInventories = () => {
    return async (dispatch: Dispatch<any>) => {
        try {
            const data = await _fetchInventories();
            dispatch(storeActions.fetchInventories(data));

        }catch(e){
            console.log(e);
        }
        // const data = await _fetchInventories();
        // dispatch(storeActions.fetchInventories(data));
    }
}
export const postInventory = createAsyncThunk(
    "store/postInventory",
    async (data: Inventory) => {
        const response = await fetch("http://localhost:3000/inventories", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });
        return response.json();
    }
);