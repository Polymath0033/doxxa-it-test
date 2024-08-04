import { ChangeEvent, FC } from "react";
//import { HTMLInputTypeAttribute, useState, forwardRef } from "react";

export const AppTextarea: FC<{
  id: string;
  title: string;
  placeholder?: string;
  className?: string;
  error?: string;
  value: string;
  changeHandler: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}> = ({ id, title, placeholder, className, error, value, changeHandler }) => {
  return (
    <div className={`${className} w-full`}>
      <label htmlFor={id} className="block">
        <span className="block text-07 capitalize text-[13px] !leading-[15px] !tracking-[-0.1px] font-medium mb-1">
          {title}
        </span>

        <textarea
          id={id}
          rows={4}
          placeholder={placeholder}
          className={`w-full resize-none border-05 border rounded focus:outline-none focus:border-01 placeholder:text-06 text-08 h-fit p-2 !tracking-[-0.25px] !leading-[15px] text-[15px] font-bold $ ${
            error ? "border-red-500" : ""
          }`}
          name={id}
          required={true}
          value={value}
          onChange={(e) => changeHandler(e)}
        ></textarea>
      </label>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};
