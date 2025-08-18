import Main from '@/components/dashboard/main'
import Sidebar from '@/components/dashboard/Sidebar'
import Topbar from '@/components/dashboard/Topbar'
import React from 'react'

const Dashboard = () => {
  return (
    <div className="flex w-screen " >
        <Sidebar />
        <div className="flex-1 flex flex-col" >
            <Topbar />
            <Main />
        </div>
      
    </div>
  )
}

export default Dashboard
