"use client"
import Header from '../../../modules/common/Header/index'
import React, { useState } from 'react'; 
import DashboardHeader from '../Header/dashboardHeader';



const HeaderComponent = ({ dict, headerSizeStyle, marginStyle, borderRadius, imageDisplay, dashboard } 
  : { 
    dict: any, 
    headerSizeStyle: string; 
    marginStyle: string;
    borderRadius: string;
    imageDisplay: boolean;
    dashboard: boolean;
  }) => {
    const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  return (
    <>
      {
        dashboard ? 
          <DashboardHeader 
            sidebarOpen={ sidebarOpen }
            setSidebarOpen={ setSidebarOpen }
            headerSizeStyle={ headerSizeStyle }
            marginStyle={ marginStyle }
            borderRadius={ borderRadius }
            imageDisplay={ imageDisplay } 
            dict={ dict }
          />
          :
          <Header
              sidebarOpen={ sidebarOpen }
              setSidebarOpen={ setSidebarOpen }
              headerSizeStyle={ headerSizeStyle }
              marginStyle={ marginStyle }
              borderRadius={ borderRadius }
              imageDisplay={ imageDisplay }
              dict={ dict }
          />

      }
    </>
  )
}

export default HeaderComponent