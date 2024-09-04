"use client"
import Appbar from '@/components/Appbar'
import DarkButton from '@/components/buttons/DarkButton'
import axios from 'axios';
import { useEffect, useState } from 'react'
import { BACKEND_URL } from '../config';

interface Zap {
  "id": string,
  "triggerId": string,
  "userId": number,
  "actions":
  {
    "id": string,
    "zapId": string,
    "actionId": string,
    "sortingOrder": number,
    "type": {
      "id": string,
      "name": string
    }
  }[]
}

function useZaps() {
  const [loading, setLoading] = useState(true);
  const [zaps, setZaps] = useState<Zap[]>([])
  useEffect(() => {
    axios.get(`${BACKEND_URL}/api/v1/zap`,{
      headers:{
        "Authorization":localStorage.getItem("token")
      }
    })
        .then(res=>{
          setZaps(res.data.zaps)
          setLoading(false)
        })
  }, [])
  return {
    loading,
    zaps
  }
}

export default function Page() {
  const {loading,zaps}=useZaps()
  return (
    <div>
      <Appbar />
      <div className='flex justify-center pt-8'>
        <div className='max-w-screen-lg w-full'>
          <div className='flex justify-between'>
            <div className='text-2xl font-bold'>
              My Zaps
            </div>
            <DarkButton onClick={() => {

            }} size='big'>Create</DarkButton>
          </div>
        </div>
      </div>
      {loading ? "Loading": <ZapTable zaps={zaps}/>}

    </div>
  )
}

function ZapTable({zaps}:{zaps:Zap[]}){
  return <table className="table-auto">
  <thead>
    <tr>
      <th></th>
      <th>Name</th>
      <th>Last Edit</th>
      <th>Running</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>The Sliding Mr. Bones (Next Stop, Pottersville)</td>
      <td>Malcolm Lockyer</td>
      <td>1961</td>
      <td>1961</td>
      <td>1961</td>
    </tr>
  </tbody>
</table>
}
