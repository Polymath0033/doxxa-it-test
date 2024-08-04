"use client";
import React, { FC, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { fetchInventory } from "@/lib/config";
import { formatNumber } from "@/lib/number-formatter";
import { useRouter, useParams } from "next/navigation";
import { LoadingPageComponent } from "./loading-page";
import { UpdateInventory } from "../molecules/update-inventory";
import { InventoryError } from "./inventory-error";
import Head from "next/head";
import Link from "next/link";
export const Inventory: FC<{ id: string }> = ({ id }) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [showUpdateModal, setShowUpdateModal] = useState(false);

  const params = useParams();

  const store = useAppSelector((state) => state.store);
  useEffect(() => {
    if (params?.id) dispatch(fetchInventory(params?.id as string));
  }, [dispatch, params.id]);
  useEffect(() => {
    store.fetchSingleError;
  }, [store.fetchSingleError]);
  return (
    <section>
      <Head>
        <title>{store.inventory?.name}</title>
        <meta name="description" content={store.inventory?.description} />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <button
          type="button"
          role="link"
          className="text-sm font-bold capitalize gap-2 flex mb-4 items-center justify-between w-fit"
          onClick={() => router.back()}
        >
          {""}
          <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6 9L2 5l4-4"
              stroke="#000"
              strokeWidth="2"
              fill="none"
              fillRule="evenodd"
            />
          </svg>
          <span>Go back </span>
        </button>
        {!store.fetchError && (
          <button
            type="button"
            onClick={() => setShowUpdateModal(!showUpdateModal)}
            className="bg-01 flex gap-3 text-white !tracking-[-0.25px] !leading-[15px] text-[15px] font-bold justify-between items-center px-4 py-2 capitalize rounded-3xl w-fit"
          >
            update
          </button>
        )}
      </div>

      {store.fetchSingleLoading && <LoadingPageComponent />}
      {store.fetchSingleError && (
        <InventoryError>
          <div className="flex flex-col items-center">
            <h3 className="text-xl text-center mx-auto  font-bold text-red-500">
              {store.fetchSingleError}
            </h3>
            <Link
              href="/"
              className="text-center bg-red-500 text-white font-medium text-[13px] !tracking-[-0.1px] px-4 py-2 !leading-[15px] mx-auto"
            >
              Go back
            </Link>
          </div>
        </InventoryError>
      )}
      {store.inventory && (
        <main className="">
          <h2 className="text-01 text-2xl font-bold capitalize ">
            {store.inventory.name}
          </h2>
          <section className="grid grid-cols-2 sm:gap-8">
            <div className="grid gap-2">
              <h4 className="text-07 text-[13px] !tracking-[-0.1px] !leading-[15px] font-medium">
                Inventory Description
              </h4>
              <p className="text-08 text-[15px] !tracking-[-0.25px] !leading-[20px] font-bold ">
                {store.inventory?.description}
              </p>
            </div>
            <div className="grid gap-2">
              <h4 className="text-07 text-[13px] !tracking-[-0.1px] !leading-[15px] font-medium">
                Inventory price
              </h4>
              <p className="text-08 text-[15px] !tracking-[-0.25px] !leading-[20px] font-bold ">
                {formatNumber(store.inventory?.price)}
              </p>
            </div>
            <div className="grid gap-2">
              <h4 className="text-07 text-[13px] !tracking-[-0.1px] !leading-[15px] font-medium">
                Inventory Quantity
              </h4>
              <p className="text-08 text-[15px] !tracking-[-0.25px] !leading-[20px] font-bold ">
                {store.inventory?.quantity}
              </p>
            </div>
            <div className="grid gap-2">
              <h4 className="text-07 text-[13px] !tracking-[-0.1px] !leading-[15px] font-medium">
                Inventory Unit Available
              </h4>
              <p className="text-08 text-[15px] !tracking-[-0.25px] !leading-[20px] font-bold ">
                {store.inventory?.unit_available}
              </p>
            </div>
            <div className="grid gap-2">
              <h4 className="text-07 text-[13px] !tracking-[-0.1px] !leading-[15px] font-medium">
                Inventory Category
              </h4>
              <p className="text-08 text-[15px] !tracking-[-0.25px] !leading-[20px] font-bold ">
                {store.inventory?.category}
              </p>
            </div>
          </section>
        </main>
      )}
      {showUpdateModal && (
        <UpdateInventory
          id={store.inventory?.id as string}
          modal={showUpdateModal}
          closeHandler={() => setShowUpdateModal(!showUpdateModal)}
        />
      )}
    </section>
  );
};
