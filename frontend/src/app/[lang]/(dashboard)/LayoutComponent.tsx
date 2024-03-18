"use client"
import { NextUIProvider } from '@nextui-org/react'
import React from 'react'; 
import { Toaster } from "react-hot-toast";

const AdminLayoutComponent = ({ children } : {
    children: any, 
}) => {
  return (
    <>
      <Toaster
        position="bottom-right"
        toastOptions={{ duration: 10000 }}
      />
      <NextUIProvider>
          {children}
      </NextUIProvider>
    </>
  )
}

export default AdminLayoutComponent