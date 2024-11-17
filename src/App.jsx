import { Routes, Route, useNavigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import ResourceInfo from './components/ResourceInfo';
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
import { isAuth, loggedInUser, roleAtom } from './recoil/atom/user/userAtoms';
import { useEffect } from 'react';
import NotFound from './components/NotFound';
import OnboardUser from './components/OnboardUser';

function App() {
    const [isAuthenticated, setIsAuthenticated] = useRecoilState(isAuth);
    const currentUser = useRecoilValue(loggedInUser);
    const navigate = useNavigate();

    async function verifyJWT() {
        const token = Cookies.get("todoToken");
        if (!token) {
            console.log("Not authorized");
            setIsAuthenticated(false);
            navigate('/login');
        } else {
            console.log("authorized");
            setIsAuthenticated(true);
        }
    }

    useEffect(() => {
        verifyJWT();
    }, [isAuthenticated]);

    return (
        <>
            {isAuthenticated && <NavBar />}
            <Routes>
                {/* Public Routes */}
                <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
                <Route path="/unauthorized" element={<NotFound />} />
                <Route path="*" element={<Login />} />

                {/* Manager Routes */}
                
                <Route path="/dashboard" element={<ManagerDash />} />
                <Route path="/all/resources" element={<MResTable />} />
                <Route path="/onboard/new" element={<OnboardUser />} />
                <Route path="/aa" element={<Sample />} />
                <Route path="/init" element={<InitialSetup />} />
                <Route path="/mtable" element={<MResTable />} />

                {/* Resource Routes */}
                <Route path="/ud" element={<UserDashboard />} />
            </Routes>
        </>
    );
}

export default App;
