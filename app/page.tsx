"use client";
import React, { Fragment, useState, useEffect, use } from "react";
import { Header } from "@/components/atoms/header";
import { Table } from "@/components/table";
import { AddInventory } from "@/components/molecules/add-inventory";
import { useAppSelector, useAppDispatch } from "@/hooks";
import { _fetchInventories } from "@/lib/config";
import { AppMain } from "@/components/molecules/main";
export default function Home() {
  const [modal, setModal] = useState(false);

  const modalHandler = () => {
    setModal(!modal);
  };
  return (
    <Fragment>
      <Header showModal={modalHandler} />
      <AppMain toggleModalHandler={modalHandler} modal={modal} />
    </Fragment>
  );
}
