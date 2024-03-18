import Image from 'next/image'
import React from 'react'
import TextArea from '../text-area/TextArea'
import ButtonV2 from '../../button/ButtonV2'

type RejectionNoteCompType = {
    title: string;
    description: string; 
    btnLabel1: string; 
    btnLabel2: string; 
    actionCancelFunction?: any; 
    actionMainFunction?: any; 
}

const RejectionNoteComp: React.FC<RejectionNoteCompType> = ({ title, description, btnLabel1, btnLabel2, actionCancelFunction, actionMainFunction }) => {
  return (
    <div className='absolute w-[70%] left-0 translate-x-1/4 translate-y-1/2 z-9999 rounded-3xl p-[2rem] shadow-lg bg-white'>
        <div className='flex rounded-full justify-center content-center p-[.3rem] w-[2rem] bg-decaissementRejectBtnBg'>
            <Image src="/new_assets/newIcons/warning_2.svg" width={30} height={30} alt='danger' />
        </div>
        <div className=''>
            <h1 className='text-[1.5rem] font-bold text-easeBlue mt-1 mb-1'>{ title }</h1>
            <p className='text-decaissementText text-[1rem]'>{ description }</p>
        </div>
        <div className='flex flex-row gap-x-[1rem]'>
            <ButtonV2 passedFunction={ actionCancelFunction } classes='bg-decaissementBtn text-decaissementText rounded-lg p-4' >{ btnLabel1 }</ButtonV2>
            <ButtonV2 passedFunction={ actionMainFunction } classes='bg-decaissementRejectBtnBg text-redishColor rounded-lg p-4' >{ btnLabel2 }</ButtonV2>
        </div>
    </div>
  )
}

export default RejectionNoteComp