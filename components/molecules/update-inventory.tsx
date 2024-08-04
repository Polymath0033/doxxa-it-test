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

  const [name, setName] = useState(inventory?.name!);
  const [description, setDescription] = useState(inventory?.description!);
  const [price, setPrice] = useState(inventory?.price!);
  const [quantity, setQuantity] = useState(inventory?.quantity!);
  const [unitAvailable, setUnitAvailable] = useState(
    inventory?.unit_available!
  );
  const [category, setCategory] = useState(inventory?.category!);
  const [errors, setErrors] = useState<Record<string, string>>({});

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
  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(description, name, price, quantity, unitAvailable, category);
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
            name: name,
            description: description,
            price: +price,
            quantity: +quantity,
            unit_available: +unitAvailable,
            category: category,
          },
        })
      );
      if (!store.updateError) {
        closeHandler();
      }
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
            value={name}
            changeHandler={(e) => setName(e.target.value)}
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
            value={price}
            changeHandler={(e) => setPrice(+e.target.value)}
            error={errors.price}
          />
        </div>
        <div className="mb-4 flex flex-col sm:flex-row gap-4 w-full">
          <AppInput
            type="number"
            id="inventory-quantity"
            title="Quantity"
            placeholder="Inventory quantity"
            value={quantity}
            changeHandler={(e) => setQuantity(+e.target.value)}
            error={errors.quantity}
          />
          <AppInput
            type="number"
            id="inventory-units_available"
            title="Units Available"
            placeholder="Units available"
            value={unitAvailable}
            changeHandler={(e) => setUnitAvailable(+e.target.value)}
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
