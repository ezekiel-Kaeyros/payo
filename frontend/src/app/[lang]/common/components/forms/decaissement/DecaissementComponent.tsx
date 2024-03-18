"use client"; 

import React, { useContext, useEffect } from 'react'
import Decaissement from '../decaissementForm/Decaissement'
import Summarry from '../summaryCard/Summarry'
// import { CounterContext } from '@/app/context/app.context';
// import { store } from '../../../../store';;

const DecaissementComponent = ({ dict }: { dict: any }) => {
    // const summaryDisplay = store.getState().cashout.summaryDisplay;
  return (
    <div className='flex w-full  justify-center content-center h-screen bg-white dark:bg-bgColorDark pb-8'>
        <Decaissement dict={ dict } />
    </div>
  )
}

export default DecaissementComponent