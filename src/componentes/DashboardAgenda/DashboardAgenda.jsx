import React from 'react'
import { Sidebar } from '../Sidebar/Sidebar'
import { Agenda } from '../Agenda/Agenda'

export const DashboardAgenda = () => {
  return (
    <div className="dashboard">
    <Sidebar />
    <Agenda />
  </div>
  )
}
