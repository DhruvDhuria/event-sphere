"use client"
import EventDetail from '@/app/components/EventDetail'
import React from 'react'
import { useParams } from 'next/navigation'

 function Page() {
  const params = useParams<{eventId: string}>()
  return (
    <EventDetail eventId={params.eventId}/>
  )
}

export default Page