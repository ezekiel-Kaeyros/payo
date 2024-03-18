import React from 'react'
import DecaissementTitle from './DecaissementTitle'
import DecaissementForm from './DecaissementForm'

const Decaissement = ({ dict }: { dict: any }) => {
  return (
    <div className='justify-self-center flex w-1/13 h-screen flex-col justify-items-center bg-white dark:bg-bgColorDark'>
        <DecaissementTitle link='/' title={ dict?.page?.decaissement?.form } />
        <DecaissementForm dict={ dict } />
        <br />
        <br />
        <br />
    </div>
  )
}

export default Decaissement