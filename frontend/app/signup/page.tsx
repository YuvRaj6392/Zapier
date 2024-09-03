"use client"
import Appbar from '@/components/Appbar'
import PrimaryButton from '@/components/buttons/PrimaryButton'
import CheckFeature from '@/components/CheckFeature'
import Input from '@/components/Input'
import React from 'react'

export default function page() {
  return (
    <div>
      <Appbar />
      <div className='flex justify-center'>
        <div className='flex pt-8 max-w-4xl'>
        <div className='flex-1 pt-20 px-4'>
          <div className='font-semibold text-3xl  pb-4'>
            Join millions worldwide who automate their work using Zapier.
          </div>
          <div className='pb-8 pt-4' >
            <CheckFeature label='Easy setup, no coding required' />
          </div>
          <div className='pb-8'>
            <CheckFeature label='Free forever for core features' />
          </div>
          <div className='pb-6'>
            <CheckFeature label='14-day trial of premium features & apps' />
          </div>
        </div>

        <div className='flex-1 pt-6 pb-6 px-4 mt-12 border rounded'>
          <Input type='text' label='Name' placeholder='Your Name' onChange={(e) => {

          }} />
          <Input type='text' label='Email' placeholder='Your Email' onChange={(e) => {

          }} />
          <Input type='password' label='Password' placeholder='Your Password' onChange={(e) => {

          }} />
          <div className='pt-4'>
            <PrimaryButton size='big' onClick={() => {

            }} >Get started free</PrimaryButton>
          </div>
        </div>
      </div>
      </div>

    </div>
  )
}
