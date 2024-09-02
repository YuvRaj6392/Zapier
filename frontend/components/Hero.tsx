"use client"
import React from 'react'
import PrimaryButton from './buttons/PrimaryButton'

export default function Hero() {
  return (
    <div>
      <div className='flex justify-center'>
        <div className='text-5xl font-semibold text-center pt-8 max-w-xl'>
        Automate as fast as you can type
      </div>
      </div>
      <div className='flex justify-center'>
        <div className='text-xl font-normal text-center pt-8 max-w-2xl'>
        AI gives you automation superpowers, and Zapier puts them to work. Pairing AI and Zapier helps you turn ideas into workflows and bots that work for you.
      </div>
      </div>
      <div className='flex'>
        <PrimaryButton onClick={()=>{}} size='big'>Get Started Free</PrimaryButton>
      </div>
    </div>
  )
}
