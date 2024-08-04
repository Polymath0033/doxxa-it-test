import { FC } from "react";

export const InventoryError: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <div className="flex justify-center items-center  fixed top-0 left-0  w-full h-screen ">
      {children}
    </div>
  );
};
