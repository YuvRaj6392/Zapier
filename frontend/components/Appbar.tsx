"use client"
import React from 'react'
import LinkButton from './buttons/LinkButton'
import { useRouter } from 'next/navigation'
import PrimaryButton from './buttons/PrimaryButton';

export default function Appbar() {
  const router = useRouter();
  return (
    <div className='flex border-b justify-between items-center p-4'>
      <div className='text-2xl font-extrabold'>
        Zapier
      </div>
      <div className='flex'>
        <div className='pr-4'>
          <LinkButton onClick={() => { }}>Contact Sales</LinkButton>
        </div>

        <div className='pr-4'>
          <LinkButton onClick={() => {
            router.push("/login")
          }}>Login</LinkButton>
        </div>

        <PrimaryButton onClick={() => {
          router.push("/signup")
        }} size='small'>Signup</PrimaryButton>
      </div>

    </div>
  )
}
