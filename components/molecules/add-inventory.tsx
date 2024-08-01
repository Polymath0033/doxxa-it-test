"use client";
import React, { FC, useState, useEffect } from "react";
import { Modal } from "../atoms/modal";
import { AppInput } from "../atoms/input";
import { AppTextarea } from "../atoms/textarea";
import { AppButton } from "../atoms/button";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { addInventory } from "@/lib/config";
import { storeActions } from "@/store/store-slice";

export const AddInventory: FC<{}> = ({}) => {
  const [inventoryName, setInventoryName] = useState("");
  const [inventoryDescription, setInventoryDescription] = useState("");
  const [inventoryPrice, setInventoryPrice] = useState<number>(0);
  const [inventoryUnitAvailable, setInventoryUnitAvailable] =
    useState<number>(0);
  const [inventoryQuantity, setInventoryQuantity] = useState<number>(0);
  const [inventoryCategory, setInventoryCategory] = useState("");
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.store);

  const addInventoryHandler = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      addInventory({
        name: inventoryName,
        description: inventoryDescription,
        price: inventoryPrice,
        quantity: inventoryQuantity,
        unit_available: inventoryUnitAvailable,
        category: inventoryCategory,
      })
    );
    dispatch(storeActions.toggleAddInventoryModal());
  };

  return (
    // <Modal
    //   isOpen={store.addInventoryModal}
    //   closeHandler={() => dispatch(storeActions.toggleAddInventoryModal())}
    // >
    <form className="w-full" onSubmit={addInventoryHandler}>
      <h3 className="text-01 !tracking-[-1.125px] font-bold text-2xl mb-3">
        Add Inventory
      </h3>
      <div className="mb-4">
        <AppInput
          id="inventory-name"
          title="Name"
          placeholder="Name of the inventory"
          changeHandler={(e) => setInventoryName(e.target.value)}
          value={inventoryName}
        />
      </div>
      <div className="mb-4">
        <AppTextarea
          id="inventory-description"
          title="Description"
          placeholder="Description of the inventory"
          changeHandler={(e) => setInventoryDescription(e.target.value)}
          value={inventoryDescription}
        />
      </div>
      <div className="mb-4">
        <AppInput
          type="number"
          id="inventory-price"
          title="Price"
          placeholder="Inventory price"
          changeHandler={(e) => setInventoryPrice(+e.target.value)}
          value={inventoryPrice}
        />
      </div>
      <div className="mb-4 flex flex-col sm:flex-row gap-4 w-full">
        <AppInput
          type="number"
          id="inventory-quantity"
          title="Quantity"
          placeholder="Inventory quantity"
          changeHandler={(e) => setInventoryQuantity(+e.target.value)}
          value={inventoryQuantity}
        />
        <AppInput
          type="number"
          id="inventory-units_available"
          title="Units Available"
          placeholder="Units available"
          changeHandler={(e) => setInventoryUnitAvailable(+e.target.value)}
          value={inventoryUnitAvailable}
        />
      </div>
      <div className="mb-4">
        <AppInput
          id="inventory-category"
          title="Category"
          placeholder="Category of the inventory"
          changeHandler={(e) => setInventoryCategory(e.target.value)}
          value={inventoryCategory}
        />
      </div>
      <AppButton
        title="Add Inventory"
        loading={store.isLoading}
        className="!p-3"
        type="submit"
      />
    </form>
    // </Modal>
  );
};
