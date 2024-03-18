"use client"; 

import React, { useEffect, useState } from 'react'
import UserTableComponent from '../../common/components/TablesComponents/userTable/UserTable';
import UsersService from '@/services/allUserService';
import { RootState, useAppDispatch } from '../../store';
import { useSelector } from 'react-redux';
import { setSideBarState } from '../../store/slices/sideBarToggleSlice';

const UserListPageComponent = () => {

  const dispatch = useAppDispatch ()

  const storeData = useSelector((state: RootState) => state.toggleSideBarData.toggleSideBar); 

  useEffect(() => {
    if (storeData === true) {
      dispatch(setSideBarState(!storeData))
    }
  }, []); 

  return (
    <div className='p-[2rem]'>
        <h1 className='text-[1.1rem] font-bold text-easeBlue mt-1 mb-1'>List des Utilisateurs</h1>
        <UserTableComponent />
    </div>
  )
}

export default UserListPageComponent