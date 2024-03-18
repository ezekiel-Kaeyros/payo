import React from 'react'
import SummaryFieldComponent from '../summaryFieldItem/SummaryFieldComponent'

type SummaryFieldRowTypes = {
    dataArray: Array<{
        img: any; 
        data: string; 
        label: string;
    }>
}

const SummaryFieldRow: React.FC<SummaryFieldRowTypes> = ({ dataArray }) => {
  return (
    <div className='flex flex-row justify-between gap-x-[2rem] w-full'>
        { dataArray && dataArray.map((data, index) => {
            return (
                <SummaryFieldComponent key={data.data} img={data.img} data={data.data} label={ data.label} /> 
            )
        })}
    </div>
  )
}

export default SummaryFieldRow