import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import ResouceInfo from './components/ResourceInfo';
import ManagerDash from './components/ManagerDash';
import ResourceTable from './components/ResourceTable';
import Login from './components/Login';
import UserDashboard from './components/UserDashboard';
import Sample from './components/Sample';
import InitialSetup from './components/IntialSetup';
import MResTable from './components/MResTable';
import Register from './components/Register';
import Cookies from 'js-cookie';
import { useRecoilState, useRecoilValue } from 'recoil';
import { isAuth, roleAtom } from './recoil/atom/user/userAtoms';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useRecoilState(isAuth)
    const navigate = useNavigate();
const role = useRecoilValue(roleAtom)
    async function verifyJWT() {
        const token = Cookies.get("todoToken");
        if (!token) {
          console.log("Not authorized");
            setIsAuthenticated(false);
            navigate("/login");
        } else {
          console.log(" authorized");
            // Optionally, verify token validity with backend here
            setIsAuthenticated(true);
        }
    }

    useEffect(() => {
        verifyJWT();
    }, [isAuthenticated]);

    return (
        <>
            <NavBar />
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login  setIsAuthenticated={setIsAuthenticated}/>} />
                <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />

                {/* Protected Routes */}
                {true ? (
                    <>
                        <Route path="/dashboard" element={<ManagerDash />} />
                        <Route path="/all/resources" element={<MResTable />} />
                        <Route path="/onboard/new" element={<ResouceInfo />} />
                        <Route path="/ud" element={<UserDashboard />} />
                        <Route path="/aa" element={<Sample />} />
                        <Route path="/init" element={<InitialSetup />} />
                        <Route path="/mtable" element={<MResTable />} />
                    </>
                ) : (
                    // Redirect to login if not authenticated
                    <Route path="*" element={<Login />} />
                )}
            </Routes>
        </>
    );
}

export default App;
