import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type FormHeaderTitle = {
  title: string;
  link: string;
}

const DecaissementTitle: React.FC<FormHeaderTitle> = ({ title, link }) => {
  return (
    <div className='flex bg-white mt-[36px] mb-[26px] gap-x-3 dark:bg-bgColorDark'>
        <h1 className='text-[1.2rem] text-easeBlue font-bold dark:text-white dark:bg-bgColorDark'>{ title }</h1>
    </div>
  )
}

export default DecaissementTitle