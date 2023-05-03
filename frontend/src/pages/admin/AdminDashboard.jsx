import React from 'react'
import Dashboard from '../../components/admin/Dashboard/Dashboard'
import NavBar from '../../components/admin/NavBar/NavBar'
import SidebarWithHeader from '../../components/admin/Layout/Layout'
import Content from '../../components/admin/Main/Main'
const AdminDashboard = () => {
  return (
    <>
    <SidebarWithHeader>
      <Content/>
    </SidebarWithHeader>
    </>
    
  )
}

export default AdminDashboard
