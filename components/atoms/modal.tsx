"use client";
import React, { FC, useEffect } from "react";
import { createPortal } from "react-dom";
const Backdrop: FC<{ closeHandler: () => void }> = ({ closeHandler }) => (
  <div
    onClick={closeHandler}
    className="fixed h-screen w-full top-0 left-0 bg-[rgba(0,_0,_0,_0.4)] z-10 "
  ></div>
);
const ModalOverlay: FC<{
  closeHandler: () => void;
  children: React.ReactNode;
  className?: string;
}> = ({ closeHandler, children, className }) => (
  <dialog
    open
    className={`fixed z-50 modal  top-1/2 left-1/2 -translate-x-1/2  w-[calc(100%_-_70px)] sm:w-[calc(100%_-_100px)]  md:w-[40rem] max-h-[calc(100vh_-_50px)]  -translate-y-1/2 rounded-2xl overflow-y-auto overflow-x-hidden h-fit py-8  px-5 ${className}`}
  >
    <button
      onClick={closeHandler}
      type="button"
      className="absolute mr-2 top-2 right-0"
    >
      <span className="flex justify-center items-center rounded-[100px] p-1 gap-[10px] bg-[#F2F2F2] ">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M7.75684 16.2375L16.2421 7.75227"
            stroke="#4F4F4F"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.2421 16.2477L7.75684 7.76245"
            stroke="#4F4F4F"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </button>
    <div>{children}</div>
  </dialog>
);
export const Modal: React.FC<{
  closeHandler: () => void;
  children: React.ReactNode;
  isOpen: Boolean;
  className?: string;
}> = ({ closeHandler, children, isOpen, className }) => {
  useEffect(() => {
    const closeOnEscapeKey = (e: KeyboardEvent) =>
      e.key === "Escape" ? closeHandler() : null;
    document.body.addEventListener("keydown", closeOnEscapeKey);
    return () => {
      document.body.removeEventListener("keydown", closeOnEscapeKey);
    };
  }, [closeHandler]);

  if (!isOpen) return null;

  return (
    <React.Fragment>
      {createPortal(
        <Backdrop closeHandler={closeHandler} />,
        document.getElementById("backdrop-root")!
      )}
      {createPortal(
        <ModalOverlay closeHandler={closeHandler} className={className}>
          {children}
        </ModalOverlay>,
        document.getElementById("modal-root")!
      )}
    </React.Fragment>
  );
};
