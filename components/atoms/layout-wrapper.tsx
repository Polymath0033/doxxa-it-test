"use client";
import { FC, Fragment } from "react";
import { useAppSelector } from "@/hooks";
import { Notification } from "./notification";
export const LayoutWrapper: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const store = useAppSelector((state) => state.store);
  return (
    <Fragment>
      {store.showNotification && <Notification />}
      <div id="backdrop-root"></div>
      <div id="modal-root"></div>
      {children}
    </Fragment>
  );
};
