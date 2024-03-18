import '../globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Head from 'next/head';
// import { ThemeProvider } from '../common/dark-mode/theme-provider/theme-provider';
// import { ThemeSwitcher } from '../common/dark-mode/theme-switcher/ThemeSwitcher';

import LoginLayoutComponent from './LoginLayoutComponent';
import ReduxProvider from '../store/ReduxProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Login',
  description: 'Connectez vous a la CASHAPP',
};

export default async function RootLayout({
  children,
  params: { lang },
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  return (
    <html lang={lang}>
        <body className={`${inter.className} dark:bg-bgColorDark`}>
          <ReduxProvider>
            <LoginLayoutComponent>
              { children }
            </LoginLayoutComponent>
          </ReduxProvider>
        </body>
    </html>
  );
}
