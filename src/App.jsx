import { useState } from 'react'
import NavBar from './components/NavBar'
import ResouceInfo from './components/ResourceInfo'
import ManagerDash from './components/ManagerDash'
import ResourceTable from './components/ResourceTable'
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login'
import UserDashboard from './components/UserDashboard'
import Sample from './components/Sample'
import InitialSetup from './components/IntialSetup'
import MResTable from './components/MResTable'
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
        {/* <Route path="/all/resources" element={<ResourceTable />} /> */}
        <Route path="/all/resources" element={<MResTable />} />
        <Route path="/onboard/new" element={<ResouceInfo />} />
        <Route path="/ud" element={<UserDashboard/>} />
        <Route path="/aa" element={<Sample />} />
        <Route path="/init" element={<InitialSetup />} />
        <Route path="/mtable" element={<MResTable/>} />
      </Routes>
    </>
  )
}

export default App
