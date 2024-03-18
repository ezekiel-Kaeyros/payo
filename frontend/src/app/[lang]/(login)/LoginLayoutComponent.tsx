"use client";

import React from 'react'
import { ThemeProvider } from '../common/dark-mode/theme-provider/theme-provider';
import { ThemeSwitcher } from '../common/dark-mode/theme-switcher/ThemeSwitcher';
import { Toaster } from 'react-hot-toast'; 

const LoginLayoutComponent = ({ children } : { children: React.ReactNode }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        <ThemeSwitcher />
        <Toaster
            position="bottom-right"
            toastOptions={{ duration: 10000 }}
          />
          <div className="flex">
            <div className="w-full">{children}</div>
          </div>
      </ThemeProvider>
  )
}

export default LoginLayoutComponent