"use client"
import React, { ReactNode } from 'react'

export default function LinkButton({ children, onClick }: { children: ReactNode, onClick: () => void }) {
  return (
    <div className=' flex justify-center px-2 py-2 cursor-pointer font-light text-sm hover:bg-slate-100 rounded' onClick={onClick}>
      {children}
    </div>
  )
}
