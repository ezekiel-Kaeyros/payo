import React from 'react';

type TextAreaProps = {
  props?: any;
  name: string;
  placeholder?: string;
  required: boolean; 
  col?: string;
  rows?: string; 
  maxLength?: string; 
  customBg?: string;
  value?: string; 
  register?: any; 
  validationMessage?: any; 
  errors?: any;
  readonly?: boolean; 
  reason?: string; 
};

const TextArea: React.FC<TextAreaProps> = ({ readonly, errors, validationMessage, register, props, name, placeholder, required, col, rows, maxLength, customBg, value }) => {
  return (
    <div className='relative w-full'>
      <label
        htmlFor={name}
        className="block mb-2 text-sm text-black font-medium dark:text-white"
      >
        <span className='text-[12px]'> { placeholder } { required ? <span style={{
        color: "red"
      }}>*</span> : ""} </span>
        {}
      </label>
      <textarea
        style={{ height: "150px"}}
        id={placeholder}
        readOnly={ readonly }
        // rows={4}
        cols={ col ? col : "72"} 
        rows={ rows ? rows : "1"}
        maxLength={ maxLength ? maxLength : 300 }
        name={name}
        {...register(name, {
          required: validationMessage
        })}
        // onChange={() => console.log("Hi")}
        value={ value !== "" ? value : "" }
        {...props}
        className={`${customBg === "textAreaColorRejectNote" ? "bg-textAreaColorRejectNote" : "bg-inputBackground" }  border-inputFieldBorder border-[2px] text-gray-900 text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-xl`}
        // ps-10
        placeholder={ placeholder }
      ></textarea>
      {
        errors && (
          <p className='text-[.9rem]' style={{
            color: "red"
            }}>{ errors }
          </p>
        )
      }
    </div>
  );
};

export default TextArea;
