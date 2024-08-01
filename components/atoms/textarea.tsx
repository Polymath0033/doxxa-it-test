import { ChangeEvent, ChangeEventHandler, FC } from "react";
export const AppTextarea: FC<{
  id: string;
  title: string;
  placeholder?: string;
  className?: string;
  changeHandler: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  value?: string;
}> = ({ id, title, placeholder, className, changeHandler, value }) => {
  return (
    <label htmlFor={id} className={`${className}`}>
      <span className="block text-07 capitalize text-[13px] !leading-[15px] !tracking-[-0.1px] font-medium mb-1">
        {title}
      </span>

      <textarea
        id={id}
        rows={4}
        placeholder={placeholder}
        className="w-full resize-none border-05 border rounded focus:outline-none focus:border-01 placeholder:text-06 text-08 h-fit p-2 !tracking-[-0.25px] !leading-[15px] text-[15px] font-bold"
        name={id}
        onChange={changeHandler}
        value={value}
      ></textarea>
    </label>
  );
};
