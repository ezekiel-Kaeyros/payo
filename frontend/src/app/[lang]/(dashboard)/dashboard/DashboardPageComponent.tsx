import React from 'react'
import CardDataStats from './components/CardDataStats'
import ChartOne from './components/ChartOne'
import ChartTwo from './components/ChartTwo'
import ChartThree from './components/ChartThree'
import dynamic from "next/dynamic";

import Image from 'next/image'; 

import img1 from '../../../../../public/dashboard_icons/ticket2.svg'; 
import img2 from '../../../../../public/dashboard_icons/house.svg'; 
import img3 from '../../../../../public/dashboard_icons/airplane-square.svg'; 
import img4 from '../../../../../public/dashboard_icons/moneys.svg'; 

const MapOne = dynamic(() => import("./components/MapOne"), {
    ssr: false,
  });
  
  function formatCompactNumber(number: any) {
    const formatter = Intl.NumberFormat("en", { notation: "compact" });
    return formatter.format(number);
  }

const DashboardPageComponent = ({ dict }: { dict: any }) => {
  return (
    <div className='pl-[2rem] pr-[2rem] h-full w-full'>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        <CardDataStats title="Ticketing" total={`${formatCompactNumber(11456000)} FCFA`} rate="0.43%" levelUp>
          <Image src={ img1 } width={40} height={ 40 } alt='img' />
        </CardDataStats>
        <CardDataStats title="Hébergement" total={`${formatCompactNumber(1456000)} FCFA`} rate="4.35%" levelUp>
          <Image src={ img2 } width={40} height={ 40 } alt='img' />
        </CardDataStats>
        <CardDataStats title="Visa" total={`${formatCompactNumber(6256000)} FCFA`} rate="2.59%" levelUp>
          <Image src={ img3 } width={40} height={ 40 } alt='img' />
        </CardDataStats>
        <CardDataStats title="Finance" total={`${formatCompactNumber(10266000)} FCFA`} rate="0.95%" levelDown>
          <Image src={ img4 } width={40} height={ 40 } alt='img' />
        </CardDataStats>
      </div>

      <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
        <MapOne />
      </div>
    </div>
  )
}

export default DashboardPageComponent