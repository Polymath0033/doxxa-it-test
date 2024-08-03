"use client";
import { FC, useState } from "react";
import { MoreActions } from "./action";
export const TDAction: FC<{ name: number; id: string; title: string }> = ({
  name,
  id,
  title,
}) => {
  const [action, setAction] = useState(false);
  const actionHandler = () => setAction(!action);
  return (
    <td className="px-4 py-2">
      <div className="flex justify-between">
        <p>{name}</p>
        <button type="button" className="relative" onClick={actionHandler}>
          {""}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="4"
            height="16"
            viewBox="0 0 4 16"
            fill="none"
          >
            <path
              d="M2 4C3.1 4 4 3.1 4 2C4 0.9 3.1 0 2 0C0.9 0 0 0.9 0 2C0 3.1 0.9 4 2 4ZM2 6C0.9 6 0 6.9 0 8C0 9.1 0.9 10 2 10C3.1 10 4 9.1 4 8C4 6.9 3.1 6 2 6ZM2 12C0.9 12 0 12.9 0 14C0 15.1 0.9 16 2 16C3.1 16 4 15.1 4 14C4 12.9 3.1 12 2 12Z"
              fill="#C5C7CD"
            />
          </svg>

          {action && (
            <MoreActions
              name={title}
              id={id}
              isOpen={action}
              closeHandler={actionHandler}
            />
          )}
        </button>
      </div>
    </td>
  );
};
