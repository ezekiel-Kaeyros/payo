import Image from 'next/image';
import React from 'react';
import { Controller } from 'react-hook-form';
import { NumericFormat } from 'react-number-format';

type InputFieldProps = {
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
  validationMessage?: string;
  valuePattern?: string;
  errors?: any;
  validationForMinNumber?: number,
  validate?: any, 
  minLength?: number, 
  message1?: string,
  maxLength?: number,
  control?: any, 
  functionToRun?: any, 
  readOnly?: boolean, 
  pwAutoCompleter?: any, 
};

const InputField: React.FC<InputFieldProps> = ({
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
  valuePattern,
  errors, 
  control, 
  functionToRun, 
  readOnly, 
  validationForMinNumber, 
  validate, 
  minLength, 
  message1,
  maxLength,
  pwAutoCompleter, 
}) => {


  if (flatStyle === true) {
    return (
      <div className='lg:relative relative w-full dark:bg-bgColorDark'>
        {/* lg:w-[350px] */}
        <label htmlFor={name} className="flex flex-row absolute z-9 top-[-40%] mt-[1rem] text-sm text-decaissementText font-medium dark:text-white"><span className='text-[12px]'> {title} </span> 
        {/* { required ? <span className='flex flex-row' style={{
          color: "red"
        }}>*</span> : ""}   */}
        </label>
        <div className="relative dark:bg-bgColorDark">
          <div className="absolute left-[-4%] inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none ">
            <Image alt='new_image' src={img} width={25} height={25} />
          </div>
          <input id={name}
            type={type}
            placeholder={`${ placeholder } ${ required ? "*" : ""}`}
            autoComplete={ pwAutoCompleter ? "new-password" : "off"}
            autoFocus
            name={name}
            readOnly={readOnly}
            // onChange={() => console.log("Hi")}
            // value={ filled === true ? data : ""}
            // value={ data }
            min={min}
          
            {...props}
            {...register(name, {
              required: validationMessage, pattern: valuePattern, minLength: minLength, maxLength: maxLength
            })}
             className={`bg-white ${ filled ? "border-easeBlue border-b-[3px]" : "border-inputFieldBorder border-b-[2px]" } outline-none focus:border-blue-500 text-gray-900 text-sm focus:ring-blue-500 focus:border-easeBlue block w-full ps-10 p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-white dark:bg-bgColorDark`} />
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
  } else if (type === "number") {
    return (
      <div className='lg:relative relative lg:w-[350px] w-full dark:bg-bgColorDark'>
        <label htmlFor={name} className="flex flex-row mb-2 text-sm text-black font-medium dark:text-white"><span className='text-[12px]'> {title} </span> { required ? <span className='flex flex-row' style={{
          color: "red"
        }}>*</span> : ""}  </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none ">
            {/* dark:bg-bgColorDark */}
            <Image alt='new_image' src={img} width={25} height={25} />
          </div>

          <Controller
              name={name}
              control={control}
              // defaultValue={ data ? data : 0 }
              render={({ field: { ref, ...rest } }) => (
              <NumericFormat
                className={`bg-inputBackground ${ filled ? "border-easeBlue border-[3px]" : "border-inputFieldBorder border-[2px]" }   text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-4  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500`}
                onChange={ (e) => functionToRun (e)}
                thousandSeparator=","
                decimalSeparator="."
                required
                // prefix="$ "
                suffix=' FCFA'
                decimalScale={2}
                getInputRef={ref}
                value={ data ? data : null }
                // {...rest}
              />
              )}
          />
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
  else {
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
            // value={ filled ? data : ""}
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

export default InputField;
