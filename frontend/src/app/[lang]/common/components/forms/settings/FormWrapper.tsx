import React from 'react'
import DecaissementTitle from '../decaissementForm/DecaissementTitle'

type FormWrapperType = {
    children: any, 
    headerTitle: string, 
    link: string
}

const FormWrapper: React.FC<FormWrapperType> = ({ children, headerTitle, link }) => {
  return (
    <div className='flex justify-center content-center h-full '>
        <div className='w-full shadow-lg p-[2rem] rounded-3xl'>
            <DecaissementTitle 
                link={ link }
                title={headerTitle}
            />
            { children }
        </div>
    </div>
  )
}

export default FormWrapper