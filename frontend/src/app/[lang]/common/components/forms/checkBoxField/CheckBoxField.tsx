import React from 'react'

type CheckBoxFieldType = {
    label: string;
    checkBoxStyle: string; 
    forCheckBox: string; 
    isChecked?: boolean;
    register?: any
    validationMessage?: string;
    name: string; 
    errors?: any;
}

const CheckBoxField: React.FC<CheckBoxFieldType> = ({ errors, name, isChecked, label, checkBoxStyle, forCheckBox, register, validationMessage }) => {

  // console.log("____________", isChecked)
  return (
    <ul className="items-center w-full text-sm font-medium text-gray-900 bg-white  rounded-lg sm:flex dark:bg-gray-700 dark:text-white">

      <li className={` dark:bg-bgColorDark w-full bg-${ checkBoxStyle } `}>
        {/* border-b border-decaissementBtn sm:border-b-0 sm:border-r dark:border-gray-600 */}
          <div className="flex items-center ps-3">
              <input name={name} {...register(name, {
                required: validationMessage
              })} id={ forCheckBox } type="checkbox" value="" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500" />
              <label htmlFor={ forCheckBox } className="w-full py-3 ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">{ label }</label>
          </div>
          {
            errors && (
              <p className='text-[.9rem]' style={{
                color: "red"
                }}>{ errors }
              </p>
            )
          }
      </li>
    </ul>
  )
}

export default CheckBoxField