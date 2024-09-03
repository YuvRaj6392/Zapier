"use client"
import React, { ReactNode } from 'react'

export default function SecondaryButton({ children, onClick, size }: { children: ReactNode, onClick: () => void, size?: "big" | "small" }) {
  return (
    <div onClick={onClick} className={`${size === "small" ? "text-sm" : "text-xl"} ${size === "small" ? "px-8 pt-2" : "px-10 py-4"} hover:shadow-md border border-black text-black rounded-full cursor-pointer`}>
      {children}
    </div>
  )
}
