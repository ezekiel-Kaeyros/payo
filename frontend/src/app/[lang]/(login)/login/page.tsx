import React from 'react'
import LoginPageComponent from '../../modules/login/LoginPageComponent';
import DataService from '@/services/dataService';
import { getDictionary } from '../../dictionaries';

const LoginPage = async ({ params }: { params: any }) => {

  const dict = await getDictionary(params) // en

  return (
    <LoginPageComponent dict={ dict } />
  )
}

export default LoginPage