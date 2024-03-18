"use client"
import { RootState, useAppDispatch } from '../../store';
import { setSideBarState } from '../../store/slices/sideBarToggleSlice';
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux';
import SettingsPageComponent from './SettingsPageComponent';

const SettingsComp = ({ dict }: { dict: any }) => {

    const dispatch = useAppDispatch(); 
    // const stored = store.getState().allUsersData.allUserData

    const storeData = useSelector((state: RootState) => state.toggleSideBarData.toggleSideBar); 

    useEffect(() => {
        if (storeData === true) {
            dispatch(setSideBarState(!storeData))
        }
    }, []); 
  return (
     <SettingsPageComponent dict={ dict } />
  )
}

export default SettingsComp