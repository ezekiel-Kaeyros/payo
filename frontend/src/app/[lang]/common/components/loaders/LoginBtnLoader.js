import React from 'react'
import LoginBtnLoaderStyle from './LoginBtnLoader.module.scss'

const LoginBtnLoader = () => {
  return (
    <div class={LoginBtnLoaderStyle["lds-ellipsis"]}><div></div><div></div><div></div><div></div></div>
  )
}

export default LoginBtnLoader