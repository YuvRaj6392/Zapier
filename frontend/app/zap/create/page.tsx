"use client"
import { BACKEND_URL } from '@/app/config'
import Appbar from '@/components/Appbar'
import PrimaryButton from '@/components/buttons/PrimaryButton'
import ZapCell from '@/components/ZapCell'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

function useAvailableActionsAndTriggers() {

  const [availableActions, setAvailableActions] = useState([]);
  const [availableTriggers, setAvailableTriggers] = useState([]);
  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/trigger/available`,{
      headers:{
        "Authorization":localStorage.getItem("token")
      }
    })
      .then(x => setAvailableTriggers(x.data.availableTriggers))

    axios.get(`${BACKEND_URL}/api/v1/action/available`,{
      headers:{
        "Authorization":localStorage.getItem("token")
      }
    })
      .then(x => setAvailableActions(x.data.availableActions))
  }, [])

  return {
    availableActions,
    availableTriggers
  }
}

export default function Page() {
  const { availableTriggers, availableActions } = useAvailableActionsAndTriggers();

  const [selectedTrigger, setSelectedTrigger] = useState<{
    id: string,
    name: string
  } | null>(null)
  const [selectedActions, setSelectedActions] = useState<{
    index: number,
    actionId: string,
    availableActionName: string
  }[]>([])

  const [selectedModalIndex, setSelectedModalIndex] = useState<null | number>(null)

  return (
    <div>
      <Appbar />
      <div className="w-full min-h-screen bg-slate-200 flex flex-col justify-center">

        <div className="flex justify-center">
          <ZapCell
            onClick={() => setSelectedModalIndex(1)}
            name={selectedTrigger?.name ? selectedTrigger.name : "Trigger"}
            index={1}
          />
        </div>

        <div className="w-full pt-2 pb-2">
          {selectedActions.map((action, index) => (
            <div key={index} className="pt-2 flex justify-center">
              <ZapCell
                onClick={() => setSelectedModalIndex(action.index)}
                key={action.actionId}
                name={action.availableActionName ? action.availableActionName : "Action"}
                index={action.index}
              />
            </div>
          ))}
        </div>

        <div className="flex justify-center items-center">
          <PrimaryButton onClick={() => {
            setSelectedActions(a => [
              ...a,
              {
                index: a.length + 2,
                actionId: "",
                availableActionName: ""
              }
            ])
          }}>
            <div className="text-2xl">+</div>
          </PrimaryButton>
        </div>
      </div>
      {selectedModalIndex !== null && (
        <Modal
          availableItems={selectedModalIndex === 1 ? availableTriggers : availableActions}
          onSelect={(props: null | { name: string, id: string }) => {
            if (props === null) {
              setSelectedModalIndex(null)
              return
            }

            if (selectedModalIndex === 1) {
              setSelectedTrigger({
                id: props.id,
                name: props.name
              })
            } else {
              setSelectedActions(a => {
                const newActions = [...a]
                newActions[selectedModalIndex - 2] = {
                  index: selectedModalIndex,
                  actionId: props.id,
                  availableActionName: props.name
                }
                return newActions
              })
            }

            setSelectedModalIndex(null)
          }}
          index={selectedModalIndex}
        />
      )}
    </div>
  )
}

function Modal({ index, onSelect, availableItems }: { index: number, onSelect: (props: null | { name: string, id: string }) => void, availableItems: { id: string, name: string, image: string }[] }) {
  return (
    <div id="default-modal" className=" fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full flex bg-opacity-70 bg-slate-100">
      <div className="relative p-4 w-full max-w-2xl max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
            <div className='text-xl'>
              Select {index === 1 ? "Trigger" : "Action"}
            </div>
            <button
              onClick={() => onSelect(null)}
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal"
            >
              <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>

          {/* Modal content */}
          <div className="p-4 md:p-5 space-y-4">
            {availableItems.map(({ id, name, image }) => {
              return <div key={id} onClick={()=>{
                onSelect({
                  id,
                  name
                })
              }} className='flex border p-4 cursor-pointer hover:bg-slate-100'>
                <img src={image} width={30} />
                <div>
                  {name}
                </div>
              </div>
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
