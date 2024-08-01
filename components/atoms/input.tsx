import { HTMLInputTypeAttribute, useState } from "react";

export const AppInput: React.FC<{
  id: string;
  className?: string;
  title: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  required?: boolean;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value?: string | number;
}> = ({
  className,
  id,
  title,
  type = "text",
  placeholder,
  required = true,
  changeHandler,
  value,
}) => {
  return (
    <label htmlFor={id} className={`${className} w-full`}>
      <span className="block text-07 capitalize text-[13px] !leading-[15px] !tracking-[-0.1px] font-medium mb-1">
        {title}
      </span>
      <input
        value={value}
        type={type}
        className="w-full border-05 border rounded focus:outline-none focus:border-[#7C5DFA] placeholder:text-06 text-08 h-fit p-2 !tracking-[-0.25px] !leading-[15px] text-[15px] font-bold"
        name={id}
        id={id}
        required={required}
        placeholder={placeholder}
        onChange={(e) => changeHandler(e)}
      />
    </label>
  );
};
/*
onChange={(e) => {
          console.log(e.target.value);
        }}
*/
