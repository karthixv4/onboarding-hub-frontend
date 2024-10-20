import { useState } from 'react'
import NavBar from './components/NavBar'
import ResouceInfo from './components/ResourceInfo'
import ManagerDash from './components/ManagerDash'
import ResourceTable from './components/ResourceTable'
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login'
import UserDashboard from './components/UserDashboard'
function App() {
  return (
    <>
      <NavBar />
      {/* <ResouceInfo /> */}
      {/* <ManagerDash /> */}
      {/* <ResourceTable /> */}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<ManagerDash />} />
        <Route path="/all/resources" element={<ResourceTable />} />
        <Route path="/onboard/new" element={<ResouceInfo />} />
        <Route path="/ud" element={<UserDashboard/>} />
      </Routes>
    </>
  )
}

export default App
