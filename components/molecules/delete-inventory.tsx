"use client";
import { FC } from "react";
import { Modal } from "../atoms/modal";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { deleteInventory } from "@/lib/config";
import { AppButton } from "../atoms/button";
export const DeleteInventory: FC<{
  modal: boolean;
  modalHandler: () => void;
  id: string;
  name: string;
}> = ({ modal, modalHandler, id, name }) => {
  const dispatch = useAppDispatch();
  const store = useAppSelector((state) => state.store);
  const deleteHandler = async () => {
    try {
      await dispatch(deleteInventory(id));
      if (!store.deleteError) {
        modalHandler();
      }
    } catch (error) {}
  };

  return (
    <Modal
      className="md:!w-[434px] !m-0"
      isOpen={modal}
      closeHandler={modalHandler}
    >
      <div className="w-full ">
        <h3 className="text-red-500 !tracking-[-1.125px] font-bold text-2xl mb-3">
          Delete Inventory
        </h3>
        <p className="text-01 !tracking-[-0.25px] text-[15px] mb-5">
          Are you sure you want to delete this inventory
          <b className="font-bold "> ‘{name}’</b>?
        </p>
        <div className="flex justify-between items-center">
          <AppButton
            type="button"
            className="!px-4 !py-2 !w-fit"
            onClick={modalHandler}
            title=" Cancel"
          />

          <AppButton
            loading={store.deleteLoading}
            title="Delete"
            type="button"
            onClick={deleteHandler}
            className="!bg-red-500 !w-fit !px-4 !py-2"
          />
        </div>
      </div>
    </Modal>
  );
};
