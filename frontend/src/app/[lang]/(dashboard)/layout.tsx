
import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Head from 'next/head';
import { ThemeProvider } from '../common/dark-mode/theme-provider/theme-provider';
import { ThemeSwitcher } from '../common/dark-mode/theme-switcher/ThemeSwitcher';
import SidebarComponent from '../common/components/sidebar/SidebarComponent';
import HeaderComponent from '../modules/common/HeaderComponent/HeaderComponent';
import AdminLayoutComponent from './LayoutComponent';
import ReduxProvider from '../store/ReduxProvider';
import { Toaster } from "react-hot-toast";
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
  // const [sidebarOpen, setSidebarOpen] = useState(false);
  return (
    <html>
      <Head>
        <meta name="description">{metadata.description}</meta>
      </Head>
      <body className={`${inter.className} dark:bg-bgColorDark h-screen overflow-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {/* <ThemeSwitcher /> */}
            <Toaster
              position="bottom-right"
              toastOptions={{ duration: 10000 }}
            />
            <main className="lg:flex lg:h-screen block h-screen relative">
                <ReduxProvider>
                  <SidebarComponent dict={ dict} />
                  <div className="h-full overflow-y-scroll lg:relative lg:flex lg:flex-1 lg:flex-col lg:overflow-y-scroll lg:overflow-x-hidden">
                      <HeaderComponent dict={ dict} headerSizeStyle='11/12' marginStyle="m-[1rem]" borderRadius="rounded-3xl" imageDisplay={ false } dashboard={ true } />
                      <div className="w-full ">
                        <AdminLayoutComponent>
                          {children}
                        </AdminLayoutComponent>
                      </div>
                  </div>
                </ReduxProvider>
            </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
