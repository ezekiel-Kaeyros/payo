import React from 'react'
import DashboardComp from './DashboardComp';
import { getDictionary } from '../../dictionaries';

const DashboardPage = async ({ params }: { params: string }) => { 

  const dict = await getDictionary(params) // en

  return (
    <DashboardComp dict={ dict } />
  )
}

export default DashboardPage