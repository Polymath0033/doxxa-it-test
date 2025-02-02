"use client";
import { FC, Fragment, useRef, useState, useEffect } from "react";
import Link from "next/link";
export const MoreActions: FC<{
  id: string;
  closeHandler: () => void;
  updateModalHandler: () => void;
  deleteModalHandler: () => void;
}> = ({ id, closeHandler, updateModalHandler, deleteModalHandler }) => {
  const [position, setPosition] = useState<"up" | "down">("down");
  const actionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const adjustPosition = () => {
      if (actionRef.current) {
        const rect = actionRef.current.getBoundingClientRect();
        if (rect.bottom > window.innerHeight) {
          setPosition("up");
        } else {
          setPosition("down");
        }
      }
    };

    adjustPosition();
    window.addEventListener("resize", adjustPosition);

    return () => {
      window.removeEventListener("resize", adjustPosition);
    };
  }, []);
  return (
    <Fragment>
      <div
        className="bg-transparent fixed top-0 left-0 w-full h-screen z-10"
        onClick={closeHandler}
      ></div>

      <div
        ref={actionRef}
        className={`bg-white absolute ${
          position === "down" ? "top-full" : "bottom-full"
        }  right-0 rounded-xl justify-start *:text-start w-[135px] shadow-[0px_0px_25.061px_0px_rgba(161,_161,_161,_0.25)] flex flex-col gap-2 *:text-[15px] *:font-semibold text-08  px-3 py-4 z-20`}
      >
        <Link className="flex gap-2" href={`/${id}`}>
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="16"
            viewBox="0 0 20 16"
            fill="none"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M10.2882 0.00481888L10.002 0C5.86108 0 2.12926 2.92308 0.0609149 7.70583C-0.020305 7.89364 -0.020305 8.10636 0.0609149 8.29416L0.204239 8.61679C2.24638 13.0931 5.77544 15.8644 9.71179 15.9952L9.998 16C14.1389 16 17.8707 13.0769 19.9391 8.29416C20.0213 8.10399 20.0202 7.88839 19.9361 7.69904L19.7968 7.38563C17.7497 2.90091 14.2192 0.135466 10.2882 0.00481888ZM10.009 1.48942L10.2479 1.49456L10.5149 1.50845C13.7122 1.73484 16.6525 4.10553 18.429 7.99911L18.4197 8.02313C16.5987 12.0005 13.5569 14.3853 10.2589 14.505L10.004 14.5088L9.74693 14.5054L9.48061 14.4915C6.38271 14.2721 3.52637 12.0344 1.73914 8.3597L1.57 7.99911L1.72658 7.66619C3.61117 3.77315 6.69148 1.49027 10.009 1.48942ZM9.9995 4.11346C7.8391 4.11346 6.0885 5.85313 6.0885 8.0002C6.0885 10.1465 7.83929 11.8859 9.9995 11.8859C12.1598 11.8859 13.9115 10.1463 13.9115 8.0002C13.9115 5.85325 12.16 4.11346 9.9995 4.11346ZM9.9995 5.60378C11.3317 5.60378 12.4115 6.6764 12.4115 8.0002C12.4115 9.32312 11.3316 10.3956 9.9995 10.3956C8.66771 10.3956 7.5885 9.32338 7.5885 8.0002C7.5885 6.67614 8.6676 5.60378 9.9995 5.60378Z"
              fill="#093D5E"
            />
          </svg>
          <span>View Details</span>
        </Link>

        <button type="button" className="cursor" onClick={updateModalHandler}>
          Update
        </button>

        <button type="button" className="cursor" onClick={deleteModalHandler}>
          Delete
        </button>
      </div>
    </Fragment>
  );
};
