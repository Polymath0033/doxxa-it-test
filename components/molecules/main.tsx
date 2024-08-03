"use client";
import { FC, useEffect, useState } from "react";
import { Table } from "../table";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { _fetchInventories, deleteInventory } from "@/lib/config";
import { AddInventory } from "./add-inventory";
import { AddInventoryBtn } from "../atoms/add-inventory-btn";
export const AppMain: FC<{
  modal: boolean;
  toggleModalHandler: () => void;
}> = ({ modal, toggleModalHandler }) => {
  const [search, setSearch] = useState("");
  const store = useAppSelector((state) => state.store);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(_fetchInventories());
  }, [dispatch]);
  const RenderContent = () => {};
  return (
    <main className="mt-12">
      <div className="mb-6">
        <label
          htmlFor="search-inventory"
          className="relative mb-3 h-fit w-full"
        >
          <i className="absolute left-3 mt-4 ">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 18 18"
              fill="none"
            >
              <path
                d="M8.625 15.75C12.56 15.75 15.75 12.56 15.75 8.625C15.75 4.68997 12.56 1.5 8.625 1.5C4.68997 1.5 1.5 4.68997 1.5 8.625C1.5 12.56 4.68997 15.75 8.625 15.75Z"
                stroke="#828282"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M16.5 16.5L15 15"
                stroke="#828282"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </i>
          <input
            type="search"
            name="search-inventory"
            placeholder="Search inventory by name"
            id="search-inventory"
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-3 pl-10 rounded-3xl border border-[#E0E0E0] focus:outline-none focus:border-[#7C5DFA]"
          />
        </label>
      </div>
      {store.fetchError ? (
        <p className="text-xl text-center mx-auto py-5 font-bold text-red-500">
          {store.fetchError}
        </p>
      ) : !store.fetchLoading && store.inventories.length < 1 ? (
        <div className="flex justify-center flex-col gap-2 items-center">
          <h3 className="text-xl text-center font-bold ">No inventory found</h3>
          <AddInventoryBtn toggleAddModal={toggleModalHandler} />
        </div>
      ) : (
        <Table
          inventories={store.inventories}
          loading={store.fetchLoading}
          search={search}
        />
      )}
      {modal && (
        <AddInventory modalState={modal} closeHandler={toggleModalHandler} />
      )}
    </main>
  );
};
