"use client";
import { FC } from "react";
import { Modal } from "../atoms/modal";
import { useAppDispatch } from "@/hooks";
import { deleteInventory } from "@/lib/config";
export const DeleteInventory: FC<{
  modal: boolean;
  closeHandler: () => void;
  id: string;
  name: string;
}> = ({ modal, closeHandler, id, name }) => {
  const dispatch = useAppDispatch();
  const deleteHandler = () => {
    dispatch(deleteInventory(id));
    closeHandler();
  };
  return (
    <Modal
      className="md:!w-[434px] !m-0"
      isOpen={modal}
      closeHandler={closeHandler}
    >
      <div>
        <h3 className="text-red-500 !tracking-[-1.125px] font-bold text-2xl mb-3">
          Delete Inventory
        </h3>
        <p className="text-01 !tracking-[-0.25px] text-[15px] mb-5">
          Are you sure you want to delete this inventory
          <b className="font-bold "> ‘{name}’</b>?
        </p>
        <div className="flex justify-between items-center">
          <button
            type="button"
            className="bg-01 text-white px-4 py-2 rounded-lg"
            onClick={closeHandler}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
            onClick={deleteHandler}
          >
            Delete
          </button>
        </div>
      </div>
    </Modal>
    // <div className="flex justify-center items-center">
    //   <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
    //     Delete
    //   </button>
    // </div>
  );
};
