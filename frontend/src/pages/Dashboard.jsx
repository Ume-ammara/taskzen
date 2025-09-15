import Main from '@/components/dashboard/Main'
import Sidebar from '@/components/dashboard/Sidebar'
import Navbar from '@/components/homedesign/Navbar'

import React from 'react'

const Dashboard = () => {
  return (
    <div className="w-screen h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1">
          <Main />
        </div>
      </div>
    </div>
  )
}

export default Dashboard

