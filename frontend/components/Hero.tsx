"use client"
import React from 'react'
import PrimaryButton from './buttons/PrimaryButton'
import SecondaryButton from './buttons/SecondaryButton'
import { useRouter } from 'next/navigation'
import Feature from './Feature'

export default function Hero() {
  const router = useRouter();
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
      <div className='flex justify-center pt-6'>
        <div className='flex'>
          <PrimaryButton onClick={() => {
            router.push("/signup")
           }} size='big'>Get Started Free</PrimaryButton>
          <div className='pl-4'>
            <SecondaryButton onClick={() => { }} size='big'>Contact Sales</SecondaryButton>
          </div>
        </div>
      </div>
      <div className='flex justify-center pt-10'>
          <Feature title='Free Forever' subtitle=' for core features'></Feature>
          <Feature title='More apps' subtitle='than any other platform'></Feature>
          <Feature title='Cutting-edge' subtitle='AI features'></Feature>
      </div>
    </div>
  )
}
