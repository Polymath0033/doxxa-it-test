import { FC, useState, useEffect } from "react";
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
  useEffect(() => {
    dispatch(_fetchInventories());
  }, [dispatch]);
  const store = useAppSelector((state) => state.store);
  const inventory = store.inventories.find((inventory) => inventory.id === id);
  const [inventoryName, setInventoryName] = useState(inventory?.name!);
  const [inventoryDescription, setInventoryDescription] = useState(
    inventory?.description!
  );
  const [inventoryPrice, setInventoryPrice] = useState<number>(
    inventory?.price!
  );
  const [inventoryQuantity, setInventoryQuantity] = useState<number>(
    inventory?.quantity!
  );
  const [inventoryUnitAvailable, setInventoryUnitAvailable] = useState<number>(
    inventory?.unit_available!
  );
  const [inventoryCategory, setInventoryCategory] = useState(
    inventory?.category!
  );
  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      name: inventoryName,
      description: inventoryDescription,
      price: inventoryPrice,
      quantity: inventoryQuantity,
      category: inventoryCategory,
    });
    dispatch(
      updateInventory({
        id: id,
        data: {
          name: inventoryName,
          description: inventoryDescription,
          price: inventoryPrice,
          quantity: inventoryQuantity,
          unit_available: inventoryUnitAvailable,
          category: inventoryCategory,
        },
      })
    );
    //  closeHandler();
  };

  return (
    // <Modal isOpen={modal} closeHandler={closeHandler}>
    <form className="w-full" onSubmit={submitHandler}>
      <h3 className="text-01 !tracking-[-1.125px] font-bold text-2xl mb-3">
        Update Inventory
      </h3>
      <div className="mb-4">
        <AppInput
          id="inventory-name"
          title="Name"
          placeholder="Name of the inventory"
          value={inventoryName}
          changeHandler={(e) => setInventoryName(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <AppTextarea
          id="inventory-description"
          title="Description"
          placeholder="Description of the inventory"
          value={inventoryDescription}
          changeHandler={(e) => setInventoryDescription(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <AppInput
          type="number"
          id="inventory-price"
          title="Price"
          placeholder="Inventory price"
          value={inventoryPrice}
          changeHandler={(e) => setInventoryPrice(Number(e.target.value))}
        />
      </div>
      <div className="mb-4 flex flex-col sm:flex-row gap-4 w-full">
        <AppInput
          type="number"
          id="inventory-quantity"
          title="Quantity"
          placeholder="Inventory quantity"
          value={inventoryQuantity}
          changeHandler={(e) => setInventoryQuantity(Number(e.target.value))}
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
          value={inventoryCategory}
          changeHandler={(e) => setInventoryCategory(e.target.value)}
        />
      </div>
      <AppButton title="Update Inventory" type="submit" className="!p-3" />
    </form>
    // </Modal>
  );
};
