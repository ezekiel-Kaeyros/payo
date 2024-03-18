
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '../common/dark-mode/theme-provider/theme-provider';
import { ThemeSwitcher } from '../common/dark-mode/theme-switcher/ThemeSwitcher';
import HeaderComponent from '../modules/common/HeaderComponent/HeaderComponent';
import ReduxProvider from '../store/ReduxProvider'; 
import { Toaster } from 'react-hot-toast'; 
import { getDictionary } from '../dictionaries';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Home Page',
  description: 'Page principale',
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  const dict = await getDictionary(params) // en
  return (
    <html >
      {/* <Head>
        <meta name="description">{metadata.description}</meta>
      </Head> */}
        <body className={`${inter.className} dark:bg-bgColorDark`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <ThemeSwitcher />
            <Toaster
              position="bottom-right"
              toastOptions={{ duration: 10000 }}
            />
            <div className="flex h-screen">
              {/* <SidebarComponent /> */}
              <ReduxProvider>
                <div className="relative flex flex-1 flex-col overflow-y-scroll overflow-x-hidden">
                  <HeaderComponent dict={ dict} headerSizeStyle="full" marginStyle="0" borderRadius="" imageDisplay={ true } dashboard={ false } />
                  <div className="w-full">{children}</div>
                </div>
              </ReduxProvider>
            </div>
          </ThemeProvider>
        </body>
    </html>
  );
}
