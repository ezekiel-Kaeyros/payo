import Image from 'next/image';
import React from 'react';
import { Controller } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

type InputFieldV2Props = {
  props?: any;
  name: string;
  placeholder?: string;
  title?: string;
  type: string;
  img: any; 
  required: boolean;
  filled?: boolean;
  data?: string | number;
  min?: any;
  flatStyle: boolean; 
  register: any;
  validationMessage: string;
  errors?: any;
  validationForMinNumber?: number,
  validate?: any, 
  minLength?: any, 
  control?: any, 
  functionToRun?: any, 
  readOnly?: boolean, 
  pwAutoCompleter?: any, 
};

const InputFieldV2: React.FC<InputFieldV2Props> = ({
  props,
  title,
  name,
  placeholder,
  type, 
  img, 
  required, 
  filled, 
  data,
  min, 
  flatStyle, 
  register, 
  validationMessage,
  errors, 
  control, 
  functionToRun, 
  readOnly, 
  validationForMinNumber, 
  validate, 
  minLength, 
  pwAutoCompleter, 
}) => {


  if (flatStyle === true) {
    return (
      <div className='lg:relative relative lg:w-[350px] w-full'>
        <label htmlFor={name} className="flex flex-row absolute z-9 top-[-40%] mt-[1rem] text-sm text-decaissementText font-medium dark:text-white"><span className='text-[12px]'> {title} </span> { required ? <span className='flex flex-row' style={{
          color: "red"
        }}>*</span> : ""}  </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <Image alt='new_image' src={img} width={25} height={25} />
          </div>
          <input id={name}
            type={type}
            placeholder={placeholder}
            autoComplete={ pwAutoCompleter ? "new-password" : "off"}
            autoFocus
            name={name}
            readOnly={readOnly}
            // onChange={() => console.log("Hi")}
            value={ filled === true ? data : ""}
            // value={ data }
            defaultValue={ data }
            min={min}
            {...props}
            {...register(name, {
              required: validationMessage, 
            })}
             className={`bg-white ${ filled ? "border-easeBlue border-b-[3px]" : "border-inputFieldBorder border-b-[2px]" } outline-none focus:border-blue-500 text-gray-900 text-sm focus:ring-blue-500 focus:border-easeBlue block w-full ps-10 p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-white`} />
              {
                errors && (
                  <p className='text-[.9rem]' style={{
                    color: "red"
                    }}>{ errors }
                  </p>
                )
              }
             
        </div>
      </div>
  
    );
  } else {
    return (
      <div className='lg:relative relative lg:w-[350px] w-full'>
        <label htmlFor={name} className="flex flex-row block mb-2 text-sm text-black font-medium dark:text-white"><span className='text-[12px]'> {title} </span> { required ? <span className='flex flex-row' style={{
          color: "red"
        }}>*</span> : ""}  </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <Image alt='new_image' src={img} width={25} height={25} />
          </div>
          <input id={name}
            type={type}
            placeholder={placeholder}
            autoComplete={ pwAutoCompleter ? "new-password" : "off"}
            autoFocus
            readOnly={readOnly}
            min={min}
            value={ filled ? data : "" }
            // defaultValue={ filled ? data : "" }
            {...props}
            {...register(name, {
              required: validationMessage, 
            })}
             className={`bg-inputBackground ${ filled ? "border-easeBlue border-[3px]" : "border-inputFieldBorder border-[2px]" }   text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500`} />
              {
                errors && (
                  <p className='text-[.9rem]' style={{
                    color: "red"
                    }}>{ errors }
                  </p>
                )
              }
        </div>
      </div>
  
    );
  }
};

export default InputFieldV2;
