"use client";
import React, { Fragment, useState } from "react";
import { Header } from "@/components/molecules/header";
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
      {}
    </Fragment>
  );
}
