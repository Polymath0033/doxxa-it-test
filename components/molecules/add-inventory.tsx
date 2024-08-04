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
  // Change all these useRef to useState

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number | null>(null);
  const [quantity, setQuantity] = useState<number | null>(null);
  const [unitAvailable, setUnitAvailable] = useState<number | null>(null);
  const [category, setCategory] = useState("");

  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.store);

  const validateInputs = () => {
    const newErrors: Record<string, string> = {};
    if (!name.trim()) newErrors.name = "Name is required";
    if (!description.trim()) newErrors.description = "Description is required";
    if (price && isNaN(price!)) newErrors.price = "Price must be a number";
    if (quantity && isNaN(quantity!))
      newErrors.quantity = "Quantity must be a number";
    if (unitAvailable && isNaN(unitAvailable!))
      newErrors.unitAvailable = "Units available must be a number";
    if (!category.trim()) newErrors.category = "Category is required";
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
          name: name,
          description: description,
          price: +price!,
          quantity: +quantity!,
          unit_available: +unitAvailable!,
          category: category,
        })
      );
      if (!store.addError) {
        closeHandler();
      }
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
            value={name}
            changeHandler={(e) => setName(e.target.value)}
            required
            error={errors.name}
          />
        </div>
        <div className="mb-4">
          <AppTextarea
            id="inventory-description"
            title="Description"
            placeholder="Description of the inventory"
            value={description}
            changeHandler={(e) => setDescription(e.target.value)}
            error={errors.description}
          />
        </div>
        <div className="mb-4">
          <AppInput
            type="number"
            id="inventory-price"
            title="Price"
            placeholder="Inventory price"
            value={price!}
            changeHandler={(e) => setPrice(+e.target.value)}
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
            value={quantity!}
            changeHandler={(e) => setQuantity(+e.target.value)}
            required
            error={errors.quantity}
          />
          <AppInput
            type="number"
            id="inventory-units_available"
            title="Units Available"
            placeholder="Units available"
            value={unitAvailable!}
            changeHandler={(e) => setUnitAvailable(+e.target.value)}
            required
            error={errors.unitAvailable}
          />
        </div>
        <div className="mb-4">
          <AppInput
            id="inventory-category"
            title="Category"
            placeholder="Category of the inventory"
            value={category}
            changeHandler={(e) => setCategory(e.target.value)}
            required
            error={errors.category}
          />
        </div>
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
