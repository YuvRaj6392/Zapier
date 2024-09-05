"use client"
import React, { ReactNode } from 'react'

export default function PrimaryButton({ children, onClick, size }: { children: ReactNode, onClick: () => void, size?: "big" | "small" }) {
  return (
    <div onClick={onClick} className={`${size === "small" ? "text-sm" : "text-xl"} ${size === "small" ? "px-8 py-2" : "px-10 py-4"} hover:shadow-md bg-amber-700 text-white rounded-full cursor-pointer text-center`}>
      {children}
    </div>
  )
}
