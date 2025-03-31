"use client"
import EventDetail from '@/app/components/EventDetail'
// import dynamic from 'next/dynamic'
import React from 'react'
import { useParams } from 'next/navigation'

 function Page() {
  const params = useParams<{eventId: string}>()
  // const EventDetailPage = dynamic(() => import("@/app/components/EventDetail"), {ssr: false})

  console.log(params.eventId)
  return (
    <EventDetail eventId={params.eventId}/>
  )
}

export default Page