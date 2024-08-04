import { HTMLInputTypeAttribute, useState, forwardRef, FC } from "react";

export const AppInput: FC<{
  id: string;
  className?: string;
  title: string;
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  required?: boolean;
  value: string | number;
  changeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}> = ({
  className,
  id,
  title,
  type = "text",
  placeholder,
  required = true,
  changeHandler,
  value,
  error,
}) => {
  return (
    <div className={`${className} w-full`}>
      <label htmlFor={id} className="block">
        <span className="block text-07 capitalize text-[13px] !leading-[15px] !tracking-[-0.1px] font-medium mb-1">
          {title}
        </span>
        <input
          type={type}
          className={`w-full border-05 border rounded focus:outline-none focus:border-[#7C5DFA] placeholder:text-06 text-08 h-fit p-2 !tracking-[-0.25px] !leading-[15px] text-[15px] font-bold ${
            error ? "border-red-500" : ""
          }`}
          name={id}
          id={id}
          required={required}
          placeholder={placeholder}
          value={value}
          onChange={(e) => changeHandler(e)}
        />
      </label>
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
};

/*
const [inputValue, setInputValue] = useState<string | number>(defaultValue);
    const [errorState, setErrorState] = useState<boolean>(false);
    const isNotEmpty = (value: string) => value.trim() !== "";
    const isANumber = (value: string | number): boolean => {
      if (value === "") return false;
      return !isNaN(Number(value));
      // const trimmedValue = value.trim();
      // const numericPattern = /^\d+(\.\d+)?$/;
      //return numericPattern.test(trimmedValue);
    };
    const changeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputValue(e.target.value);
    };
    if (hasValidation) {
      if (type === "number") {
        if (!isANumber(inputValue as string)) {
          setErrorState(true);
        }
      }
      if (!isNotEmpty(inputValue as string)) {
        setErrorState(true);
      }
    }
*/
