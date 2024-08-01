"use client";
import { storeActions } from "@/store/store-slice";
import { useAppDispatch } from "@/hooks";
export const AddInventoryBtn = () => {
  const dispatch = useAppDispatch();
  return (
    <button
      onClick={() => dispatch(storeActions.toggleAddInventoryModal())}
      type="button"
      className="bg-01 flex gap-3 text-white !tracking-[-0.25px] !leading-[15px] text-[15px] font-bold justify-between items-center p-2 rounded-3xl "
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="32"
        height="32"
        viewBox="0 0 32 32"
        fill="none"
      >
        <circle cx="16" cy="16" r="16" fill="white" />
        <path
          d="M17.3131 21.0229V17.3131H21.0229V14.7328H17.3131V11.0229H14.7328V14.7328H11.0229V17.3131H14.7328V21.0229H17.3131Z"
          fill="#7C5DFA"
        />
      </svg>
      Add new product
    </button>
  );
};