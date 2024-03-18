"use client"; 

import React, { useEffect } from 'react'
import TableComponent from '../../common/components/TablesComponents/decaissementTable/Table';
import { RootState, useAppDispatch } from '../../store';
import { setSideBarState } from '../../store/slices/sideBarToggleSlice';
import { useSelector } from 'react-redux';

const CashoutspageComponent = () => {

  const dispatch = useAppDispatch ()

  const storeData = useSelector((state: RootState) => state.toggleSideBarData.toggleSideBar); 

  useEffect(() => {
    if (storeData === true) {
      dispatch(setSideBarState(!storeData))
    }
  }, []); 
  return (
    <div className='p-[2rem]'>
        <h1 className='text-[1.1rem] font-bold text-easeBlue mt-1 mb-1'>Décaissements</h1>
        <TableComponent />
    </div>
  )
}

export default CashoutspageComponent