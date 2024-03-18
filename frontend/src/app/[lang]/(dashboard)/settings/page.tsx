import React from 'react'
import SettingsPageComponent from './SettingsPageComponent'
import SettingsComp from './SettingsCompo'
import { getDictionary } from '../../dictionaries'

const SettingsPage = async ({ params }: { params: any }) => {
  const dict = await getDictionary(params) // en
  return (
    <SettingsComp dict={ dict } />
  )
}

export default SettingsPage
