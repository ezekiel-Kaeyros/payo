"use client"
import React, { useEffect } from 'react'
import DashboardPageComponent from './DashboardPageComponent'
import { RootState, useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import { setSideBarState } from '../../store/slices/sideBarToggleSlice';

const DashboardComp = ({ dict }: { dict: any }) => {

    const dispatch = useAppDispatch ()

    const storeData = useSelector((state: RootState) => state.toggleSideBarData.toggleSideBar); 

    useEffect(() => {
        if (storeData === true) {
            dispatch(setSideBarState(!storeData))
        }
    }, []); 

  return (
    <DashboardPageComponent dict={ dict } />
  )
}

export default DashboardComp