import Image from 'next/image';
import React from 'react';

type SelectFieldProps = {
  title?: string;
  name: string;
  options: Array<{
    id: string | number, 
    value: string, 
    text: string | number,
  }>;
  // options: any;
  placeHolder: string, 
  img: any, 
  props?: any;
  required?: boolean;
  flatStyle: boolean;
  readOnly?: boolean;
  value?: any; 
  valueId?: string | number;
  filled?: boolean; 
  register: any; 
  validationMessage?: string; 
  runningFunction?: any, 
  errors?: any; 
  onChangeIt?: any;
};

const SelectField: React.FC<SelectFieldProps> = ({
  title,
  options,
  name,
  props,
  placeHolder, 
  img, 
  required, 
  flatStyle,
  value, 
  valueId, 
  readOnly, 
  filled, 
  register, 
  validationMessage, 
  errors, 
  runningFunction, 
  onChangeIt, 
}) => {

  const handleSelectOption = (e: any) => {
    if (onChangeIt) {
      onChangeIt (e.target.value)
    } else {
      console.log("000000")
    }
  }

  if (flatStyle === true) {

    return (
      <div className='lg:relative relative w-full'>
        <label
          htmlFor={name}
          className="absolute z-9 top-[-20%] block text-sm text-decaissementText font-medium dark:text-white"
        >
          <span className='text-[12px]'> {title} </span>
        </label>
        <div className="relative">
          <div className="absolute left-[-4%] inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <Image alt='new_image' src={img} width={25} height={25} />
          </div>
          <select
            disabled={ readOnly }
            name={name}
            {...props}
            id={name}
            {...register(name, {
              onChange:  handleSelectOption, 
              required: validationMessage, 
            })}
            className="bg-white outline-none border-inputFieldBorder border-b-[3px] text-decaissementText text-sm focus:ring-blue-500 focus:border-easeBlue block w-full ps-10 p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:bg-bgColorDark"
          >
            <option value={ filled === true ? valueId : "" }>
              { filled === true ? value : `${required ? `${ placeHolder } *` : `${ placeHolder }` }` }
            </option>
            { options && options?.map((option: {
                id: string | number, 
                value: string | number, 
                text: string | number, 
              }, index) => (
              <option key={index} value={option.value} selected={ option.value === valueId ? true : false }>
                {option.text}
              </option>
            ))}
          </select>
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
        <label
          htmlFor={name}
          className="block mb-2 text-sm text-decaissementText font-medium dark:text-white"
        >
          <span className='text-[12px]'> {title} </span>
          { required ? <span style={{
            color: "red"
          }}>*</span> : ""}

        </label>
        <div className="relative">
          <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
            <Image alt='new_image' src={img} width={25} height={25} />
          </div>
          <select
            name={name}
            {...props}
            id={name} 
            defaultValue={ valueId }
            {...register(name, {
              onChange:  handleSelectOption, 
              required: validationMessage
            })}
            className="bg-inputBackground border-inputFieldBorder border-[2px] text-decaissementText text-sm  focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-4 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 rounded-xl"
          >
            <option >
              { value ? value : placeHolder }
            </option>
            { options && options?.map((option: {
                id: string | number, 
                value: string | number, 
                text: string | number,
              }, index) => (
              <option  key={index} selected={ option.value === valueId ? true : false } value={option.value}>
                {option.text}
              </option>
            ))}
          </select>
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

export default SelectField;
