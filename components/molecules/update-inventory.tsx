import { FC, useState, useEffect, useRef } from "react";
import { AppButton } from "@/components/atoms/button";
import { AppInput } from "@/components/atoms/input";
import { AppTextarea } from "@/components/atoms/textarea";
import { Modal } from "@/components/atoms/modal";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { _fetchInventories, updateInventory } from "@/lib/config";
export const UpdateInventory: FC<{
  id: string;
  modal: boolean;
  closeHandler: () => void;
}> = ({ modal, closeHandler, id }) => {
  const dispatch = useAppDispatch();

  const store = useAppSelector((state) => state.store);
  const inventory = store.inventories.find((inventory) => inventory.id === id);

  const inventoryNameRef = useRef<HTMLInputElement>(null);

  const inventoryDescriptionRef = useRef<HTMLTextAreaElement>(null);

  const inventoryPriceRef = useRef<HTMLInputElement>(null);

  const inventoryQuantityRef = useRef<HTMLInputElement>(null);

  const inventoryUnitAvailableRef = useRef<HTMLInputElement>(null);

  const inventoryCategoryRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
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
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validateInputs();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    try {
      await dispatch(
        updateInventory({
          id: id,
          data: {
            name: inventoryNameRef.current?.value!,
            description: inventoryDescriptionRef.current?.value!,
            price: +inventoryPriceRef.current?.value!,
            quantity: +inventoryQuantityRef.current?.value!,
            unit_available: +inventoryUnitAvailableRef.current?.value!,
            category: inventoryCategoryRef.current?.value!,
          },
        })
      );
      closeHandler();
    } catch (error) {}
  };

  return (
    <Modal isOpen={modal} closeHandler={closeHandler}>
      <form className="w-full" onSubmit={submitHandler}>
        <h3 className="text-01 !tracking-[-1.125px] font-bold text-2xl mb-3">
          Update Inventory
        </h3>
        <div className="mb-4">
          <AppInput
            id="inventory-name"
            title="Name"
            placeholder="Name of the inventory"
            required
            defaultValue={inventory?.name}
            ref={inventoryNameRef}
            error={errors.name}
          />
        </div>
        <div className="mb-4">
          <AppTextarea
            id="inventory-description"
            title="Description"
            placeholder="Description of the inventory"
            defaultValue={inventory?.description}
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
            defaultValue={inventory?.price}
            ref={inventoryPriceRef}
            error={errors.price}
          />
        </div>
        <div className="mb-4 flex flex-col sm:flex-row gap-4 w-full">
          <AppInput
            type="number"
            id="inventory-quantity"
            title="Quantity"
            placeholder="Inventory quantity"
            defaultValue={inventory?.quantity}
            ref={inventoryQuantityRef}
            error={errors.quantity}
          />
          <AppInput
            type="number"
            id="inventory-units_available"
            title="Units Available"
            placeholder="Units available"
            defaultValue={inventory?.unit_available}
            ref={inventoryUnitAvailableRef}
            error={errors.unitAvailable}
          />
        </div>
        <div className="mb-4">
          <AppInput
            id="inventory-category"
            title="Category"
            placeholder="Category of the inventory"
            defaultValue={inventory?.category}
            ref={inventoryCategoryRef}
            error={errors.category}
          />
        </div>
        {store.addError && (
          <p className="text-red-500 text-xs mt-1">{store.addError}</p>
        )}
        <AppButton
          title="Update Inventory"
          type="submit"
          loading={store.updateLoading}
          className="!p-3"
        />
      </form>
    </Modal>
  );
};
