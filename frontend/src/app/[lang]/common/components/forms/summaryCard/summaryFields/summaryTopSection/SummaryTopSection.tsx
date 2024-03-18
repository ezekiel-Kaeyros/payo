"use client"; 

import Image from 'next/image'
import React from 'react'

import easeLogo from "../../../../../../../../../public/new_assets/logo/lightLogo.png"; 

type SummaryTopSectionTypes = {
    fullName: string; 
    phoneNumber: string; 
    inputationNumber: string;
    date: string; 
    amount: string; 
    office?: string;
}

const SummaryTopSection: React.FC<SummaryTopSectionTypes> = ({ office, fullName, phoneNumber, inputationNumber, date, amount }) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'long', day: 'numeric', weekday: 'long' }
    let formattedAmount = null

    if (amount.toString()?.includes("FCFA")) {
        formattedAmount = amount
    } else {
        let formattedNumber = parseInt(amount).toLocaleString('cm-CM', {
            style: 'currency',
            currency: 'XAF',
        });
        formattedAmount = formattedNumber.replace("FCFA", "").replace(",", " ").trim() + " FCFA";
    }

    const TimeDate = new Date(date)?.toLocaleDateString("fr-FR", options)

  return (
    <div className='w-full flex flex-row gap-x-[2rem]'>
        <div className=' flex flex-col gap-y-[.5rem]'>
            <div className='bg-easeBlue p-[2rem] flex justify-start rounded-3xl'>
                <Image src={ easeLogo } width={100} height={100} alt='ease_logo' />
            </div>
            <div className='bg-summaryBgGray rounded-3xl p-[2rem]'>
                <p className='text-summaryGray text-[.8rem]'>Décaissement de</p>
                <h1 className='text-[1.2rem] font-bold text-black-2 mt-1 mb-1'>{ fullName }</h1>
                <p className='text-summaryGray text-[.8rem]'>{ office }</p>
                <p className='text-summaryGray text-[.8rem]'>{ office }-Cameroun</p>
            </div>
        </div>
        <div className='flex flex-col gap-y-[1rem] rounded-3xl bg-white border-summaryBgGray border-[1px] p-[1rem]'>
            <div className='bg-summaryBgGray p-[1rem] rounded-2xl'>
                <p className='text-summaryGray text-[.8rem]'>NO d&apos;inputation</p>
                <h1 className='text-[1.1rem] font-bold text-black-2 mt-1 mb-1'>{ inputationNumber }</h1>
            </div>
            <div className='bg-summaryBgGray p-[1rem] rounded-2xl'>
                <p className='text-summaryGray text-[.8rem]'>Date</p>
                <h1 className='text-[1.1rem] font-bold text-black-2 mt-1 mb-1'>{  TimeDate.charAt(0).toLocaleUpperCase() + TimeDate.slice(1)  }</h1>
            </div>
            <div className='flex flex-col content-center justify-center pt-[1rem] bg-white border-t border-t-summaryBgGrayD'>
                <p className='text-summaryGray text-[.8rem]'>Montant</p>
                <h1 className='text-[1.3rem] font-bold text-black-2 mt-1 mb-1'>{ formattedAmount }</h1>
            </div>
        </div>
    </div>
  )
}

export default SummaryTopSection