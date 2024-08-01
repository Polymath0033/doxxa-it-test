import { FC } from "react";
export const AppButton: FC<{
  title: string;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  loading?: boolean;
}> = ({ title, className, onClick, type = "button", loading = false }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${className} bg-01 font-bold !leading-[15px] !tracking-[-0.25px] text-[15px] flex justify-center items-center gap-2 text-white rounded-lg p-2  w-full focus:outline-none`}
    >
      {loading && <span className="loader"></span>}
      {title}
    </button>
  );
};
//
