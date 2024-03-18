import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type HopePageCarStrings = {
    img: string, 
    title: string, 
    paragraphe: string, 
    link: string, 
}


const HomePageCard: React.FC <HopePageCarStrings> = ({ img, title, paragraphe, link } ) => {
  return (
    <div className="transition p-[24px] ease-in-out delay-150 hover:scale-105 max-w-sm bg-lemon rounded-[16px] shadow dark:bg-gray-800 dark:border-gray-700 hover:bg-easeBlue hover:text-white dark:bg-boxdark">
        <Link href={ link }>
            <Image
                className="rounded-t-lg p-5"
                width={100}
                height={100}
                src={img}
                alt="Logo"
            />
        </Link>
        <div className="p-5">
            <Link href={ link }>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white ">{ title }</h5>
            </Link>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400 ">{ paragraphe }</p>
        </div>
    </div>
  )
}

export default HomePageCard