import Image from 'next/image'
import React from 'react'

type SummaryFieldComponentTypes = {
    img: any; 
    data: string; 
    label: string; 
}

const SummaryFieldComponent: React.FC<SummaryFieldComponentTypes> = ({ img, data, label }) => {
  return (
    <div className='flex flex-row w-1/2 gap-y-[.5rem] rounded-lg bg-summaryBgGray border-summaryBgGrayD border-[1px] p-[.5rem]'>
        <div className='Image'>
            <Image src={img} width={20} height={20} alt={label} />
        </div>
        <div className=''>
            <p className='text-summaryGray text-[.8rem]'>{ label }</p>
            <p className='text-summaryGray font-bold text-[.8rem]'>{ data }</p>
        </div>
    </div>
  )
}

export default SummaryFieldComponent