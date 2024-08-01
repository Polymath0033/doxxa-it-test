"use client";
import Link from "next/link";
import { FC, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { _fetchInventories } from "@/lib/config";
import { AddInventoryBtn } from "./add-inventory-btn";
export const Header: FC<{ showModal: () => void }> = ({ showModal }) => {
  const store = useAppSelector((state) => state.store);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(_fetchInventories());
  }, [dispatch]);
  return (
    <header className="flex flex-col gap-3 sm:flex-row justify-between items-baseline">
      <div className="">
        <h1 className="text-08 text-4xl font-bold !tracking-[-1.125px] ">
          <Link href="/">DoxxaIT Inventory</Link>
        </h1>
        <p className="text-06 text-[13px] !leading-[15px] !tracking-[0.1px]">
          There are {store.inventories.length} total inventor
          {store.inventories.length > 1 ? "ies" : "y"}
        </p>
      </div>

      <div>
        {/* <button type="button">Filter inventories</button> */}
        <AddInventoryBtn />
      </div>
    </header>
  );
};
