import Image from 'next/image';
import React, { useState } from 'react'

import whiteTickI from "../../../../../../../../../public/new_assets/trackingIcons/whitcheckmark.png"
import pinkCrossI from "../../../../../../../../../public/new_assets/trackingIcons/pinkCancelButton.png"
import RejectionNoteComp from '../../../rejectionNote/RejectionNoteComp';
import ViewRejectionNoteComp from '../../../rejectionNote/ViewRejectionNoteComp';
import { RootState, useAppDispatch } from '@/app/[lang]/store';
import { toggleShowRejectionNote } from '@/app/[lang]/store/slices/refreshSlice';
import { useSelector } from 'react-redux';

type StatusType = {
    name: string, 
    flag: number, 
}

type StepperItemTypes = {
    status: StatusType; 
    validationType: string; 
    admin: string;
    date: string; 
    time: string;
}

const StepperItem: React.FC<StepperItemTypes> = ({ status, validationType, admin, date, time }) => {
        
    let colorName = "white"
    let stickColor = "summaryBgGrayD"

    if (status?.flag === 1) {
        colorName = "easeBlue"
        stickColor = "easeBlue"
    } else if (status?.flag === 2) {
        colorName = "decaissementRejectBtnBg"
        stickColor = "decaissementRejectBtnBg"
    } else if (status?.flag === 3) {
        colorName = "white"
    }

    const dispatch = useAppDispatch(); 
    const showRejectionNote = useSelector((state: RootState) => state.refreshToggleData.showRejectionNote)

    const handleRejectionDisplay = () => {
        if (status?.flag === 2) {
            dispatch(toggleShowRejectionNote(true)); 
            console.log("clicked.............")
        } else {
            console.log("nothng")
        }
    }

  return (
    <>
        <div onClick={handleRejectionDisplay} className={`relative border-t-${ stickColor } border-t-[2px] pt-[1rem] pr-[10px]`}>
            {/* ${ stickState ? "border-t-validDecaissement" : "border-t-summaryBgGrayD" } */}
            <div className={`bg-${ colorName } absolute rounded-full shadow-lg border-summaryBgGrayD border-[1px] p-[.3rem] w-[1.3rem] h-[1.3rem] top-[-15%] z-1`}>
                { colorName === "easeBlue" ? <Image src={ whiteTickI } alt='whiteCheck' width={10} height={2} /> : "" } 
                { colorName === "decaissementRejectBtnBg" ? <Image src={ pinkCrossI } alt='pinkCancelButton' width={10} height={2} /> : "" }
            </div>
            {/* ${ circleState ? "bg-validDecaissement" : "bg-white" } */}
            <div className=''>
                <h2 className='text-easeBlue font-bold text-[12px]'>{ validationType}</h2>
            </div>
            <div className=''>
                <h2 className='text-dateSummaryTextColor font-bold text-[12px]'>{ admin }</h2>
            </div>
            <div className=''>
                <h3 className='text-dateSummaryTextColor font-bold text-[9px]'>{ date }</h3>
            </div>
            <div className=''>
                <h3 className='text-timeTextColor font-bold text-[8px]'>{ time }</h3>
            </div>
        </div>

        
    </>


  )
}

export default StepperItem