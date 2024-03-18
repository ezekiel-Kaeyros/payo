import DecaissementComponent from '../../common/components/forms/decaissement/DecaissementComponent'
import React from 'react'
import { getDictionary } from '../../dictionaries'


const DecaissementPage = async ({ params }: { params: any }) => {
  const dict = await getDictionary(params) // en
  return (
    <DecaissementComponent dict={ dict } />
  )
}

export default DecaissementPage