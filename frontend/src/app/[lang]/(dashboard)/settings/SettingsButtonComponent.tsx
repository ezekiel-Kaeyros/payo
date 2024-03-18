import Image from 'next/image';
import React from 'react'

type SettingsButtonType = {
    handleClick: any; 
    tableDisplay: boolean; 
    normalImg: string; 
    SelectedImage: string; 
    label: string;
}

const SettingsButtonComponent: React.FC<SettingsButtonType> = ({ label, handleClick, tableDisplay, normalImg, SelectedImage }) => {
  return (
    <button onClick={ () => handleClick ()} className={`flex flex-row  justify-center content-center items-center ${ tableDisplay ? "bg-easeBlue dark:bg-easeBlue text-white shadow-lg" : "bg-white dark:bg-bgColorDark text-easeBlue" } gap-x-[.5rem] rounded-3xl px-[1rem] py-[.5rem] text-[15px] hover:bg-easeBlue hover:text-white dark:bg-bgColorDark dark:text-primaryWhite`}>
        {
            tableDisplay ? 
                <Image src={ SelectedImage } width={20} height={20} alt='Office' />
                :
                <Image src={ normalImg } width={20} height={20} alt='Office' />
        }
        { label }
    </button>
  )
}

export default SettingsButtonComponent