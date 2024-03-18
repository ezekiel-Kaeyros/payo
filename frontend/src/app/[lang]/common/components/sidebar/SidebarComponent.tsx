"use client"
// import Sidebar from '@/app/modules/sidebar/Sidebar';
import MainSidebar from '../../components/sidebar/index'
import React from 'react'
import { useState } from 'react';

const SidebarComponent = ({ dict }: { dict: any }) => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  return (
    <MainSidebar
        dict={ dict}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
    />
  )
}

export default SidebarComponent