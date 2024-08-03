"use client";
import React, { FC, useState, useRef } from "react";
import { Modal } from "../atoms/modal";
import { AppInput } from "../atoms/input";
import { AppTextarea } from "../atoms/textarea";
import { AppButton } from "../atoms/button";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { addInventory } from "@/lib/config";

export const AddInventory: FC<{
  modalState: boolean;
  closeHandler: () => void;
}> = ({ modalState, closeHandler }) => {
  const [errors, setErrors] = useState<Record<string, string>>({});

  const inventoryNameRef = useRef<HTMLInputElement>(null);
  const inventoryDescriptionRef = useRef<HTMLTextAreaElement>(null);
  const inventoryPriceRef = useRef<HTMLInputElement>(null);
  const inventoryQuantityRef = useRef<HTMLInputElement>(null);
  const inventoryUnitAvailableRef = useRef<HTMLInputElement>(null);
  const inventoryCategoryRef = useRef<HTMLInputElement>(null);

  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.store);

  const validateInputs = () => {
    const newErrors: Record<string, string> = {};
    if (!inventoryNameRef.current?.value.trim())
      newErrors.name = "Name is required";
    if (!inventoryDescriptionRef.current?.value.trim())
      newErrors.description = "Description is required";
    if (
      !inventoryPriceRef.current?.value.trim() ||
      isNaN(Number(inventoryPriceRef.current?.value))
    )
      newErrors.price = "Price must be a number";
    if (
      !inventoryQuantityRef.current?.value.trim() ||
      isNaN(Number(inventoryQuantityRef.current?.value))
    )
      newErrors.quantity = "Quantity must be a number";
    if (
      !inventoryUnitAvailableRef.current?.value.trim() ||
      isNaN(Number(inventoryUnitAvailableRef.current?.value))
    )
      newErrors.unitAvailable = "Units available must be a number";
    if (!inventoryCategoryRef.current?.value.trim())
      newErrors.category = "Category is required";
    return newErrors;
  };

  const addInventoryHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = validateInputs();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      await dispatch(
        addInventory({
          name: inventoryNameRef.current?.value!,
          description: inventoryDescriptionRef.current?.value!,
          price: +inventoryPriceRef.current?.value!,
          quantity: +inventoryQuantityRef.current?.value!,
          unit_available: +inventoryUnitAvailableRef.current?.value!,
          category: inventoryCategoryRef.current?.value!,
        })
      );
      closeHandler();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal isOpen={modalState} closeHandler={closeHandler}>
      <form className="w-full" onSubmit={addInventoryHandler}>
        <h3 className="text-01 !tracking-[-1.125px] font-bold text-2xl mb-3">
          Add Inventory
        </h3>
        <div className="mb-4">
          <AppInput
            id="inventory-name"
            title="Name"
            placeholder="Name of the inventory"
            ref={inventoryNameRef}
            required
            error={errors.name}
          />
        </div>
        <div className="mb-4">
          <AppTextarea
            id="inventory-description"
            title="Description"
            placeholder="Description of the inventory"
            ref={inventoryDescriptionRef}
            error={errors.description}
          />
        </div>
        <div className="mb-4">
          <AppInput
            type="number"
            id="inventory-price"
            title="Price"
            placeholder="Inventory price"
            ref={inventoryPriceRef}
            required
            error={errors.price}
          />
        </div>
        <div className="mb-4 flex flex-col sm:flex-row gap-4 w-full">
          <AppInput
            type="number"
            id="inventory-quantity"
            title="Quantity"
            placeholder="Inventory quantity"
            ref={inventoryQuantityRef}
            required
            error={errors.quantity}
          />
          <AppInput
            type="number"
            id="inventory-units_available"
            title="Units Available"
            placeholder="Units available"
            ref={inventoryUnitAvailableRef}
            required
            error={errors.unitAvailable}
          />
        </div>
        <div className="mb-4">
          <AppInput
            id="inventory-category"
            title="Category"
            placeholder="Category of the inventory"
            ref={inventoryCategoryRef}
            required
            error={errors.category}
          />
        </div>
        {store.addError && (
          <p className="text-red-500 text-xs mt-1">{store.addError}</p>
        )}
        <AppButton
          title="Add Inventory"
          loading={store.addLoading}
          className="!p-3"
          type="submit"
        />
      </form>
    </Modal>
  );
};
