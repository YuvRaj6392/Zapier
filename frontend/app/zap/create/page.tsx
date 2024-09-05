"use client"
import Appbar from '@/components/Appbar'
import PrimaryButton from '@/components/buttons/PrimaryButton'
import ZapCell from '@/components/ZapCell'
import React, { useState } from 'react'

export default function Page() {
  const [selectedTrigger, setSelectedTrigger] = useState("")
  const [selectedActions, setSelectedActions] = useState<{
    actionId: string,
    availableActionName: string
  }[]>([])
  return (
    <div>
      <Appbar />
      <div className='w-full min-h-screen bg-slate-200 flex flex-col justify-center'>
        <div className='flex justify-center'>
          <ZapCell name={selectedTrigger ? selectedTrigger : "Trigger"} index={1} />
        </div>
        <div className='w-full pt-2 pb-2'>
          {selectedActions.map((action, index) => <div key={index} className=' pt-2 flex justify-center'> <ZapCell key={action.actionId} name={action.availableActionName ? action.availableActionName : "Action"} index={2 + index} /> </div>)}
        </div>
        <div className='flex justify-center items-center'>
          <div>
          <PrimaryButton onClick={() => {
          setSelectedActions(a => [...a, {
            actionId: "",
            availableActionName: ""
          }])
        }}> <div className='text-2xl'>
            +
          </div> </PrimaryButton>
        </div>
        </div>
      </div>
    </div>
  )
}
