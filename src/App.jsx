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
import { isAuth, loggedInUser, roleAtom } from './recoil/atom/user/userAtoms';
import PrivateRoute from './components/PrivateRoute';
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
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/register" element={<Register setIsAuthenticated={setIsAuthenticated} />} />
            <Route path="/unauthorized" element={<NotFound />} />
            <Route path="*" element={<Login />} />

            {/* Protected Routes for Manager */}
            <Route
                path="/dashboard"
                element={
                    <PrivateRoute requiredRole="manager">
                        <ManagerDash />
                    </PrivateRoute>
                }
            />
            <Route
                path="/all/resources"
                element={
                    <PrivateRoute requiredRole="manager">
                        <MResTable />
                    </PrivateRoute>
                }
            />
            <Route
                path="/onboard/new"
                element={
                    <PrivateRoute requiredRole="manager">
                        <OnboardUser />
                    </PrivateRoute>
                }
            />
            <Route
                path="/aa"
                element={
                    <PrivateRoute requiredRole="manager">
                        <Sample />
                    </PrivateRoute>
                }
            />
            <Route
                path="/init"
                element={
                    <PrivateRoute requiredRole="manager">
                        <InitialSetup />
                    </PrivateRoute>
                }
            />
            <Route
                path="/mtable"
                element={
                    <PrivateRoute requiredRole="manager">
                        <MResTable />
                    </PrivateRoute>
                }
            />

            {/* Protected Routes for Resource */}
            <Route
                path="/ud"
                element={
                    <PrivateRoute requiredRole="resource">
                        <UserDashboard />
                    </PrivateRoute>
                }
            />
        </Routes>
    </>
    );
}

export default App;
